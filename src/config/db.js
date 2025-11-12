const { MongoClient, ServerApiVersion } = require('mongodb');

let database;

async function connectDb() {
  if (database) return database;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;
  if (!uri) throw new Error('MONGODB_URI missing');
  if (!dbName) throw new Error('DB_NAME missing');

  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
    tls: true,
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();
    database = client.db(dbName);
    console.log(`✅ Connected to database: ${dbName}`);
    return database;
  } catch (err) {
    console.error('Error connecting to the database', err);
    throw err;
  }
}

module.exports = { connectDb };
