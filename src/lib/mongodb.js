// src/lib/mongodb.js
import { getDb } from "./dbConnection"; // same folder

/**
 * Generic helper if you need any collection by name.
 */
export async function getCollection(name) {
  const db = await getDb();
  return db.collection(name);
}

/**
 * Specific helper for the users collection.
 */
export async function getUsersCollection() {
  return getCollection("users");
}
