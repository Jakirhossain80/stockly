import { getDb } from "@/lib/dbConnection";
export const runtime = "nodejs";

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
