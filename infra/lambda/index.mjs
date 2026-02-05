import { DynamoDBClient, GetItemCommand, UpdateItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

const db = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// Validate username: alphanumeric, 1-20 chars
const isValidUsername = (name) => {
  if (typeof name !== 'string') return false;
  return /^[a-zA-Z0-9]{1,20}$/.test(name);
};

export const handler = async (event) => {
  // Reject cross-origin browser requests not from our site
  const origin = event.headers?.origin ?? '';
  if (origin && origin !== ALLOWED_ORIGIN) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  }

  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  try {
    // GET /cookie/count — return global count
    if (method === 'GET' && path === '/cookie/count') {
      const result = await db.send(new GetItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'GLOBAL' } },
      }));
      const count = result.Item ? parseInt(result.Item.count.N, 10) : 0;
      return { statusCode: 200, body: JSON.stringify({ count }) };
    }

    // GET /cookie/leaderboard — return top 10 users + global count
    if (method === 'GET' && path === '/cookie/leaderboard') {
      // Query for top 10 users (sorted by count descending)
      const leaderboardResult = await db.send(new QueryCommand({
        TableName: TABLE,
        IndexName: 'LeaderboardIndex',
        KeyConditionExpression: '#type = :userType',
        ExpressionAttributeNames: { '#type': 'type' },
        ExpressionAttributeValues: { ':userType': { S: 'USER' } },
        ScanIndexForward: false, // descending order
        Limit: 10,
      }));

      // Get global count
      const globalResult = await db.send(new GetItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'GLOBAL' } },
      }));
      const globalCount = globalResult.Item ? parseInt(globalResult.Item.count.N, 10) : 0;

      // Format leaderboard
      const leaderboard = (leaderboardResult.Items || []).map((item, index) => ({
        username: item.displayName?.S ?? item.id.S.replace('USER#', ''),
        count: parseInt(item.count.N, 10),
        rank: index + 1,
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ leaderboard, globalCount }),
      };
    }

    // POST /cookie — increment cookie count
    if (method === 'POST') {
      // Parse optional username from body
      let username = null;
      if (event.body) {
        try {
          const body = JSON.parse(event.body);
          if (body.username && isValidUsername(body.username)) {
            username = body.username;
          }
        } catch {
          // Invalid JSON body — ignore and proceed without username
        }
      }

      // Always increment global count
      const globalResult = await db.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'GLOBAL' } },
        UpdateExpression: 'SET #type = :globalType ADD #c :inc',
        ExpressionAttributeNames: { '#c': 'count', '#type': 'type' },
        ExpressionAttributeValues: { ':inc': { N: '1' }, ':globalType': { S: 'GLOBAL' } },
        ReturnValues: 'ALL_NEW',
      }));
      const globalCount = parseInt(globalResult.Attributes.count.N, 10);

      // If username provided, also increment user count
      if (username) {
        const userResult = await db.send(new UpdateItemCommand({
          TableName: TABLE,
          Key: { id: { S: `USER#${username.toLowerCase()}` } },
          UpdateExpression: 'SET #type = :userType, displayName = :displayName ADD #c :inc',
          ExpressionAttributeNames: { '#c': 'count', '#type': 'type' },
          ExpressionAttributeValues: {
            ':inc': { N: '1' },
            ':userType': { S: 'USER' },
            ':displayName': { S: username },
          },
          ReturnValues: 'ALL_NEW',
        }));
        const userCount = parseInt(userResult.Attributes.count.N, 10);

        return {
          statusCode: 200,
          body: JSON.stringify({ globalCount, userCount, username }),
        };
      }

      // Anonymous click — return global count only (use 'count' for backward compat)
      return { statusCode: 200, body: JSON.stringify({ count: globalCount, globalCount }) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
