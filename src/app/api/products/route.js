import { getDb } from "@/lib/dbConnection";
export const runtime = "nodejs";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDb();
  const docs = await db.collection("products").find({}).sort({ _id: -1 }).toArray();

  const data = docs.map(d => {
    const { _id, ...rest } = d;
    return { id: _id.toString(), ...rest };
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}



export async function POST(req) {
  try {
    const body = await req.json();
    const { productname, imageLink, description, detaildescription } = body || {};

    if (!productname || !imageLink || !description || !detaildescription) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const db = await getDb();
    const { insertedId } = await db.collection("products").insertOne({
      productname,
      imageLink,
      description,
      detaildescription,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ id: insertedId.toHexString?.() ?? insertedId.toString() }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    return new Response(
      JSON.stringify({ message: "Failed to create", error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").toLowerCase().trim();
    const password = body?.password || "";

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ message: "Password must be at least 6 characters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await getDb();

    // Ensure a unique index on email (run once in Atlas/Compass or keep here)
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    // Duplicate check
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert
    const { insertedId } = await db.collection("users").insertOne({
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ id: insertedId.toString(), email, name }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/auth/register error:", err);
    // Handle duplicate key race condition cleanly
    if (String(err).includes("E11000")) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

