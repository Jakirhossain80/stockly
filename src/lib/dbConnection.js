// lib/dbConnection.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "stockly";

let client;
let clientPromise;

// Only initialize if URI exists
if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoClientPromise) {
      client = new MongoClient(uri, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      });
      globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
  } else {
    client = new MongoClient(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });
    clientPromise = client.connect();
  }
} else {
  console.warn("⚠️ MONGODB_URI is missing. Did you set it in .env.local?");
}

/**
 * Get the connected MongoDB client
 */
export async function getClient() {
  if (!clientPromise) {
    throw new Error("❌ MONGODB_URI not configured. Add it to .env.local");
  }
  return clientPromise;
}

/**
 * Get a db instance
 */
export async function getDb() {
  const c = await getClient();
  return c.db(dbName);
}

/**
 * Quick health check
 */
export async function ping() {
  const db = await getDb();
  await db.command({ ping: 1 });
  return true;
}

export { clientPromise };
