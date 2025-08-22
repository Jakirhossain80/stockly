// components/AddProduct.jsx
"use client";

import { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    productname: "",
    imageLink: "",
    description: "",
    detaildescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const reset = () =>
    setForm({
      productname: "",
      imageLink: "",
      description: "",
      detaildescription: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    // Basic validation
    if (!form.productname || !form.imageLink || !form.description || !form.detaildescription) {
      setMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to add product");
      }

      setMsg({ type: "success", text: "Product added successfully!" });
      reset();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-500">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 transition-all duration-500">
        Add Product
      </h1>

      {msg.text ? (
        <div
          className={[
            "mb-4 rounded-md border px-4 py-3 text-sm transition-all duration-500",
            msg.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
              : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300",
          ].join(" ")}
        >
          {msg.text}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 transition-all duration-500"
      >
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Product Name
          </label>
          <input
            name="productname"
            value={form.productname}
            onChange={onChange}
            type="text"
            placeholder="Bose SoundLink Revolve+ II Speaker"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
          />
        </div>

        {/* Image Link */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Image Link
          </label>
          <input
            name="imageLink"
            value={form.imageLink}
            onChange={onChange}
            type="url"
            placeholder="https://i.postimg.cc/FFwrMSFt/speaker.png"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={3}
            placeholder="Portable Bluetooth speaker with 360° sound."
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
          />
        </div>

        {/* Detail Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Detail Description
          </label>
          <textarea
            name="detaildescription"
            value={form.detaildescription}
            onChange={onChange}
            rows={5}
            placeholder="The Bose SoundLink Revolve+ II delivers deep, immersive sound in every…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-[#16A34A] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A] disabled:opacity-60 dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A] transition-all duration-500"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all duration-500"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
