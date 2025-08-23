// components/Login.jsx
"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingCreds, setLoadingCreds] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });

  // Map NextAuth ?error= to friendly messages (covers OAuth + Credentials)
  const errorText = useMemo(() => {
    const err = searchParams.get("error");
    if (!err) return "";
    const map = {
      OAuthSignin: "Could not start Google sign-in.",
      OAuthCallback: "Google sign-in was cancelled or failed.",
      OAuthAccountNotLinked:
        "This email is already linked to another provider. Try a different login method.",
      AccessDenied: "Access denied.",
      Configuration: "Auth configuration issue. Contact support.",
      Verification: "Verification failed or expired.",
      CredentialsSignin: "Invalid username/email or password.",
      Default: "Login failed. Please try again.",
    };
    return map[err] || map.Default;
  }, [searchParams]);

  const callbackUrl = searchParams.get("callbackUrl") || "/products";

  const handleGoogle = async () => {
    try {
      setLoadingGoogle(true);
      // Use redirect:false so we can reliably navigate to the returned URL.
      const res = await signIn("google", { callbackUrl, redirect: false });
      if (res?.error) {
        // Surface an OAuth error in the existing banner via ?error=
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("error", "OAuthSignin");
        router.replace(`?${params.toString()}`);
        return;
      }
      if (res?.url) {
        window.location.href = res.url;
        return;
      }
      // Fallback: hit the provider route directly if no URL returned
      window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
        callbackUrl
      )}`;
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCredentials = async (e) => {
    e.preventDefault();
    if (!form.identifier || !form.password) return;

    try {
      setLoadingCreds(true);
      // NextAuth will redirect by default if redirect: true
      const res = await signIn("credentials", {
        redirect: true,
        callbackUrl,
        // Your CredentialsProvider `authorize` should read the same keys:
        identifier: form.identifier, // email or username
        password: form.password,
      });
      // If redirect is true, we usually don't get here on success
      if (res?.error) {
        // With redirect: true, NextAuth usually appends ?error= to URL.
        // This is just a safety no-op; the error banner uses ?error= already.
      }
    } finally {
      setLoadingCreds(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] grid place-items-center px-4 transition-all duration-500">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 transition-all duration-500">
          {/* Logo + Title */}
          <div className="mb-6 flex items-center gap-3">
            <div className="size-10 grid place-items-center rounded-lg bg-[#16A34A] text-white font-semibold dark:bg-[#22C55E] dark:text-slate-900 transition-all duration-500">
              S
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 transition-all duration-500">
                Stockly
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Sign in to continue
              </p>
            </div>
          </div>

          {/* Error */}
          {errorText ? (
            <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300 transition-all duration-500">
              {errorText}
            </div>
          ) : null}

          {/* Credentials form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email or Username
              </label>
              <input
                name="identifier"
                value={form.identifier}
                onChange={onChange}
                type="text"
                placeholder="you@example.com"
                autoComplete="username"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 transition-all duration-500"
              />
            </div>

            <button
              type="submit"
              disabled={loadingCreds}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#16A34A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A] disabled:opacity-60 dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A] transition-all duration-500"
            >
              {loadingCreds ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
            or continue with
            <span className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loadingGoogle}
            className="w-full inline-flex items-center justify-center gap-3 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-slate-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-60 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-800 transition-all duration-500"
            aria-label="Continue with Google"
          >
            <FcGoogle className="text-xl" />
            {loadingGoogle ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[#16A34A] hover:underline dark:text-[#22C55E] transition-all duration-500"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
