// components/Products.jsx
import Link from "next/link";
import { getDb } from "../../../src/lib/dbConnection";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Products() {
  // 1) Read from MongoDB directly
  const db = await getDb();
  const docs = await db.collection("products").find({}).sort({ _id: -1 }).toArray();

  // 2) Normalize _id to a stable 24-hex id for links
  const products = docs.map(({ _id, ...rest }) => ({
    id: _id?.toHexString ? _id.toHexString() : _id.toString(),
    ...rest,
  }));

  // 3) Empty state
  if (!products.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-all duration-500">
          No products found.
        </div>
      </div>
    );
  }

  // 4) Grid UI
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-slate-800 dark:text-slate-100 transition-all duration-500">
        Products
      </h1>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
              <Image
                src={p.imageLink}
                alt={p.productname}
                className="h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-1 text-base font-semibold text-slate-800 transition-all duration-500 dark:text-slate-100">
                {p.productname}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600 transition-all duration-500 dark:text-slate-300">
                {p.description}
              </p>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between">
                <Link
                  // encode the id to be extra safe
                  href={`/products/${encodeURIComponent(p.id)}`}
                  className="inline-flex items-center gap-2 rounded-md bg-[#16A34A] px-3 py-2 text-sm font-medium text-white transition-all duration-500 hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A]"
                >
                  Details <span aria-hidden>→</span>
                </Link>
                <span className="text-xs text-slate-500 transition-all duration-500 dark:text-slate-400">
                  Stockly
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
