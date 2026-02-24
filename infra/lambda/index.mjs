import { DynamoDBClient, GetItemCommand, UpdateItemCommand, QueryCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { randomUUID } from 'crypto';

const db = new DynamoDBClient({});
const sns = new SNSClient({});
const TABLE = process.env.TABLE_NAME;
const VISITORS_TABLE = process.env.VISITORS_TABLE_NAME;
const VISITOR_SNS_TOPIC = process.env.VISITOR_SNS_TOPIC;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const DEDUP_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

const MAX_BODY_BYTES = 512;

// Alphanumeric only, 1-20 chars
const isValidUsername = (name) => {
  if (typeof name !== 'string') return false;
  return /^[a-zA-Z0-9]{1,20}$/.test(name);
};

// CORS response helper
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const respond = (statusCode, body) => ({
  statusCode,
  headers: corsHeaders,
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  // Reject cross-origin browser requests not from our site
  const origin = event.headers?.origin ?? '';
  if (origin && origin !== ALLOWED_ORIGIN) {
    return respond(403, { error: 'Forbidden' });
  }

  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return respond(204, '');
  }

  try {
    // ── GET /cookie/count — global count ──
    if (method === 'GET' && path === '/cookie/count') {
      const result = await db.send(new GetItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'GLOBAL' } },
      }));
      const count = result.Item ? parseInt(result.Item.count.N, 10) : 0;
      return respond(200, { count });
    }

    // ── GET /cookie/leaderboard — top 10 users + global count ──
    if (method === 'GET' && path === '/cookie/leaderboard') {
      const [leaderboardResult, globalResult] = await Promise.all([
        db.send(new QueryCommand({
          TableName: TABLE,
          IndexName: 'LeaderboardIndex',
          KeyConditionExpression: '#type = :userType',
          ExpressionAttributeNames: { '#type': 'type' },
          ExpressionAttributeValues: { ':userType': { S: 'USER' } },
          ScanIndexForward: false,
          Limit: 10,
        })),
        db.send(new GetItemCommand({
          TableName: TABLE,
          Key: { id: { S: 'GLOBAL' } },
        })),
      ]);

      const globalCount = globalResult.Item ? parseInt(globalResult.Item.count.N, 10) : 0;

      const leaderboard = (leaderboardResult.Items || []).map((item, index) => ({
        username: item.displayName?.S ?? item.id.S.replace('USER#', ''),
        count: parseInt(item.count.N, 10),
        rank: index + 1,
      }));

      return respond(200, { leaderboard, globalCount });
    }

    // ── POST /cookie — increment cookie count ──
    if (method === 'POST' && path === '/cookie') {
      // Reject oversized bodies
      if (event.body && Buffer.byteLength(event.body, 'utf8') > MAX_BODY_BYTES) {
        return respond(400, { error: 'Request body too large' });
      }

      // Parse optional username from body
      let username = null;
      let displayName = null;
      if (event.body) {
        try {
          const body = JSON.parse(event.body);
          if (body.username && isValidUsername(body.username)) {
            username = body.username;
            displayName = username;
          }
        } catch {
          // Invalid JSON — proceed without username
        }
      }

      // Always increment global count (every click, named or anonymous)
      const globalResult = await db.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'GLOBAL' } },
        UpdateExpression: 'SET #type = :globalType ADD #c :inc',
        ExpressionAttributeNames: { '#c': 'count', '#type': 'type' },
        ExpressionAttributeValues: { ':inc': { N: '1' }, ':globalType': { S: 'GLOBAL' } },
        ReturnValues: 'ALL_NEW',
      }));
      const globalCount = parseInt(globalResult.Attributes.count.N, 10);

      // If username provided, also increment that user's leaderboard count
      if (username) {
        const userResult = await db.send(new UpdateItemCommand({
          TableName: TABLE,
          Key: { id: { S: `USER#${username.toLowerCase()}` } },
          UpdateExpression: 'SET #type = :userType, displayName = :displayName ADD #c :inc',
          ExpressionAttributeNames: { '#c': 'count', '#type': 'type' },
          ExpressionAttributeValues: {
            ':inc': { N: '1' },
            ':userType': { S: 'USER' },
            ':displayName': { S: displayName },
          },
          ReturnValues: 'ALL_NEW',
        }));
        const userCount = parseInt(userResult.Attributes.count.N, 10);
        return respond(200, { globalCount, userCount, username: displayName });
      }

      // Anonymous click
      return respond(200, { count: globalCount, globalCount });
    }

    // ── POST /visit — record a visitor ──
    if (method === 'POST' && path === '/visit') {
      const ip = event.requestContext.http.sourceIp;
      const userAgent = event.headers?.['user-agent'] ?? '';
      const referrer = event.headers?.referer ?? '';

      let visitPath = '/';
      if (event.body) {
        try {
          const body = JSON.parse(event.body);
          if (typeof body.path === 'string') visitPath = body.path.slice(0, 200);
        } catch { /* ignore */ }
      }

      // Deduplicate: skip if same IP visited within the last 30 minutes
      const now = new Date();
      const cutoff = new Date(now.getTime() - DEDUP_WINDOW_MS).toISOString();
      const recentResult = await db.send(new QueryCommand({
        TableName: VISITORS_TABLE,
        IndexName: 'ByIp',
        KeyConditionExpression: 'ip = :ip AND #ts > :cutoff',
        ExpressionAttributeNames: { '#ts': 'timestamp' },
        ExpressionAttributeValues: {
          ':ip': { S: ip },
          ':cutoff': { S: cutoff },
        },
        Limit: 1,
      }));

      if (recentResult.Items && recentResult.Items.length > 0) {
        return respond(200, { ok: true, dedup: true });
      }

      // Look up geolocation from ip-api.com
      let geo = {};
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city,regionName,country,lat,lon,isp`
        );
        const geoData = await geoRes.json();
        if (geoData.status === 'success') {
          geo = {
            city: geoData.city,
            region: geoData.regionName,
            country: geoData.country,
            lat: geoData.lat,
            lon: geoData.lon,
            isp: geoData.isp,
          };
        }
      } catch (geoErr) {
        console.error('Geolocation lookup failed:', geoErr);
      }

      // Convert timestamp to EST
      const estTimestamp = now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      });

      // Build combined location string: "City, State, Country"
      const location = [geo.city, geo.region, geo.country].filter(Boolean).join(', ');

      // Build high-precision lat,lon string
      const latLon = (geo.lat != null && geo.lon != null)
        ? `${geo.lat.toFixed(8)},${geo.lon.toFixed(8)}`
        : '';

      const timestamp = now.toISOString();
      const item = {
        id: { S: randomUUID() },
        pk: { S: 'VISIT' },
        ip: { S: ip },
        timestamp: { S: timestamp },
        timestampEST: { S: estTimestamp },
        userAgent: { S: userAgent },
        referrer: { S: referrer },
        path: { S: visitPath },
      };

      if (location) item.location = { S: location };
      if (latLon) item.latLon = { S: latLon };
      if (geo.isp) item.isp = { S: geo.isp };

      await db.send(new PutItemCommand({
        TableName: VISITORS_TABLE,
        Item: item,
      }));

      // Send SNS notification
      if (VISITOR_SNS_TOPIC) {
        const snsLocation = location || 'Unknown';
        const message = `New visitor: ${ip}\n${snsLocation}${geo.isp ? `\nISP: ${geo.isp}` : ''}`;
        await sns.send(new PublishCommand({
          TopicArn: VISITOR_SNS_TOPIC,
          Message: message,
        }));
      }

      return respond(200, { ok: true });
    }

    // ── POST /click — record a button click ──
    if (method === 'POST' && path === '/click') {
      let label = '';
      if (event.body) {
        try {
          const body = JSON.parse(event.body);
          if (typeof body.label === 'string') label = body.label.slice(0, 100);
        } catch { /* ignore */ }
      }

      const ip = event.requestContext.http.sourceIp;
      const now = new Date();
      const timestamp = now.toISOString();
      const estTimestamp = now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      });

      await db.send(new PutItemCommand({
        TableName: VISITORS_TABLE,
        Item: {
          id: { S: randomUUID() },
          pk: { S: 'CLICK' },
          ip: { S: ip },
          timestamp: { S: timestamp },
          timestampEST: { S: estTimestamp },
          label: { S: label },
        },
      }));

      return respond(200, { ok: true });
    }

    return respond(405, { error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
