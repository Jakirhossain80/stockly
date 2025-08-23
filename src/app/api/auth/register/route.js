// app/api/auth/register/route.js
import { getUsersCollection } from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";






export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").toLowerCase().trim();
    const password = body?.password || "";

    if (!name || !email || !password) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ message: "Invalid email" }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    const users = await getUsersCollection();
    await users.createIndex({ email: 1 }, { unique: true });

    const exists = await users.findOne({ email });
    if (exists) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const { insertedId } = await users.insertOne({ name, email, passwordHash, createdAt: new Date() });

    return Response.json({ id: insertedId.toString(), email, name }, { status: 201 });
  } catch (e) {
    const msg = String(e);
    if (msg.includes("E11000")) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }
    return Response.json({ message: "Registration failed" }, { status: 500 });
  }
}
 