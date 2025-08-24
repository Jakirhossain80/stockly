"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(next)}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm
                 hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-800"
      aria-label="Toggle dark mode"
    >
      {current === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
