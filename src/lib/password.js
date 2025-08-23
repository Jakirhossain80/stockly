import bcrypt from "bcryptjs";

// Hash plain text password
export async function hashPassword(password) {
  const saltRounds = 10; // cost factor
  return await bcrypt.hash(password, saltRounds);
}

// Verify plain text password against hashed password
export async function verifyPassword(password, hashed) {
  return await bcrypt.compare(password, hashed);
}
