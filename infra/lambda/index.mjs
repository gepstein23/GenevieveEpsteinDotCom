import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const db = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

export const handler = async (event) => {
  // Reject cross-origin browser requests not from our site
  const origin = event.headers?.origin ?? '';
  if (origin && origin !== ALLOWED_ORIGIN) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  }

  const method = event.requestContext.http.method;

  try {
    if (method === 'GET') {
      const result = await db.send(new GetItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'cookies' } },
      }));
      const count = result.Item ? parseInt(result.Item.count.N, 10) : 0;
      return { statusCode: 200, body: JSON.stringify({ count }) };
    }

    if (method === 'POST') {
      const result = await db.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: { id: { S: 'cookies' } },
        UpdateExpression: 'ADD #c :inc',
        ExpressionAttributeNames: { '#c': 'count' },
        ExpressionAttributeValues: { ':inc': { N: '1' } },
        ReturnValues: 'ALL_NEW',
      }));
      const count = parseInt(result.Attributes.count.N, 10);
      return { statusCode: 200, body: JSON.stringify({ count }) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
