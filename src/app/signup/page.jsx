// app/signup/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // 🔎 Trim + client-side checks (match server rules)
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || !password) {
      setMsg("All fields are required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Invalid email");
      return;
    }
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ send trimmed values
        body: JSON.stringify({ name, email, password }),
      });

      // Read the response body for clearer errors
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // 400/409 errors arrive here — show server's message
        throw new Error(body?.message || "Registration failed");
      }

      // Auto sign-in then redirect to /products
      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/products",
        identifier: email,
        password,
      });
    } catch (e) {
      setMsg(e.message || "Something went wrong.");
      console.error("Register error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] grid place-items-center px-4 transition-all duration-500">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-6 flex items-center gap-3">
            <div className="size-10 grid place-items-center rounded-lg bg-[#16A34A] text-white font-semibold dark:bg-[#22C55E] dark:text-slate-900">
              S
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Create your Stockly account
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Sign up to add and manage products
              </p>
            </div>
          </div>

          {msg ? (
            <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300">
              {msg}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Jane Doe"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A] disabled:opacity-60 dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A]"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600 dark:text-slate-300">Already have an account? </span>
            <Link href="/login" className="font-medium text-[#16A34A] hover:underline dark:text-[#22C55E]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
