import { DynamoDBClient, GetItemCommand, UpdateItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

const db = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

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

    return respond(405, { error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return respond(500, { error: 'Internal server error' });
  }
};
