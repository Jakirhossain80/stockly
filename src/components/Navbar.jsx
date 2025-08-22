"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";


export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // next-themes: avoid hydration mismatch
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Add Products", href: "/dashboard/add-product" },
  ];

  const authLinks = [
    { label: "Login", href: "/login" },
    { label: "Signup", href: "/signup" }, // Add this route if you implement it
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;
  const toggleTheme = () => setTheme(currentTheme === "dark" ? "light" : "dark");

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/90 dark:bg-slate-800/90 backdrop-blur
        border-b border-gray-200 dark:border-slate-700
        shadow-sm
        transition-all duration-500
      "
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Stockly Home"
          >
            {/* Simple logo placeholder */}
            <div
              className="
                size-8 rounded-md grid place-items-center
                bg-[#16A34A] dark:bg-[#22C55E]
                text-white text-sm font-semibold
                transition-all duration-500
                group-hover:scale-105
              "
            >
              S
            </div>
            <span
              className="
                text-lg font-semibold
                text-slate-800 dark:text-slate-100
                transition-all duration-500
              "
            >
              Stockly
            </span>
          </Link>

          {/* Right: Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Main links */}
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                      "text-slate-700 hover:text-[#16A34A] hover:bg-gray-100",
                      "dark:text-slate-200 dark:hover:text-[#22C55E] dark:hover:bg-slate-700/60",
                      isActive(link.href)
                        ? "text-[#16A34A] dark:text-[#22C55E] bg-gray-100 dark:bg-slate-700/60"
                        : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="
                inline-flex items-center justify-center
                rounded-md p-2
                text-slate-700 hover:text-[#16A34A] hover:bg-gray-100
                dark:text-slate-200 dark:hover:text-[#22C55E] dark:hover:bg-slate-700/60
                transition-all duration-500
              "
              aria-label="Toggle theme"
            >
              {mounted && currentTheme === "dark" ? (
                <FiSun className="text-xl" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button>

            {/* Auth links */}
            <ul className="flex items-center gap-1">
              {authLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      px-3 py-2 rounded-md text-sm font-medium
                      text-slate-700 hover:text-white hover:bg-[#16A34A]
                      dark:text-slate-200 dark:hover:bg-[#22C55E] dark:hover:text-slate-900
                      transition-all duration-300
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: menu button + theme toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="
                inline-flex items-center justify-center
                rounded-md p-2
                text-slate-700 hover:text-[#16A34A] hover:bg-gray-100
                dark:text-slate-200 dark:hover:text-[#22C55E] dark:hover:bg-slate-700/60
                transition-all duration-500
              "
              aria-label="Toggle theme"
            >
              {mounted && currentTheme === "dark" ? (
                <FiSun className="text-xl" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="
                inline-flex items-center justify-center
                rounded-md p-2
                text-slate-700 hover:text-[#16A34A] hover:bg-gray-100
                dark:text-slate-200 dark:hover:text-[#22C55E] dark:hover:bg-slate-700/60
                transition-all duration-500
              "
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={[
            "lg:hidden overflow-hidden transition-all duration-500",
            menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="pb-4 pt-2 space-y-1">
            {/* Main links */}
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
                      "text-slate-700 hover:text-[#16A34A] hover:bg-gray-100",
                      "dark:text-slate-200 dark:hover:text-[#22C55E] dark:hover:bg-slate-700/60",
                      isActive(link.href)
                        ? "text-[#16A34A] dark:text-[#22C55E] bg-gray-100 dark:bg-slate-700/60"
                        : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-slate-700 my-2" />

            {/* Auth links */}
            <ul className="flex flex-col">
              {authLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      block px-3 py-2 rounded-md text-base font-medium
                      text-slate-700 hover:text-white hover:bg-[#16A34A]
                      dark:text-slate-200 dark:hover:bg-[#22C55E] dark:hover:text-slate-900
                      transition-colors duration-300
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
