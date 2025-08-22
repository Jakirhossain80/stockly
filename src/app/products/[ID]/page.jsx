// app/products/[id]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic"; // fresh in dev

// Normalize any weird id forms like: ObjectId("abc...") -> abc...
function normalizeId(raw) {
  const s = (raw ?? "").toString().trim();
  const m = s.match(/^ObjectId\(["']?([a-fA-F0-9]{24})["']?\)$/);
  return m ? m[1] : s;
}

export default async function ProductDetailsPage({ params }) {
  // 1) Get, normalize, and validate id
  const raw = typeof params?.id === "string" ? params.id : "";
  const id = normalizeId(decodeURIComponent(raw));

  if (!ObjectId.isValid(id)) {
    return notFound();
  }

  // 2) Query MongoDB
  const db = await getDb();
  const doc = await db.collection("products").findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return notFound();
  }

  // 3) Normalize to your schema
  const product = {
    id: doc._id.toHexString(),
    productname: doc.productname || "",
    imageLink: doc.imageLink || "",
    description: doc.description || "",
    detaildescription: doc.detaildescription || "",
  };

  // 4) UI
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-500">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[#16A34A] hover:underline dark:text-[#22C55E] transition-all duration-500"
        >
          <span aria-hidden>←</span> Back to Products
        </Link>
      </div>

      <article className="rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm transition-all duration-500 overflow-hidden">
        {/* Image */}
        <div className="relative w-full bg-gray-100 dark:bg-slate-700 transition-all duration-500">
          {product.imageLink ? (
            <img
              src={product.imageLink}
              alt={product.productname}
              className="w-full h-72 sm:h-96 object-contain p-6"
              loading="eager"
            />
          ) : (
            <div className="h-24 sm:h-28 grid place-items-center text-slate-500 dark:text-slate-400">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 transition-all duration-500">
            {product.productname}
          </h1>

          {product.description && (
            <p className="mt-2 text-slate-600 dark:text-slate-300 transition-all duration-500">
              {product.description}
            </p>
          )}

          {product.detaildescription && (
            <div className="mt-4 text-slate-700 dark:text-slate-200 leading-relaxed transition-all duration-500">
              {product.detaildescription}
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[#16A34A] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A] dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A] transition-all duration-500"
            >
              Browse more <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
