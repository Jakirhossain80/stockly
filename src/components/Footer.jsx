// components/Footer.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },     // add the page if you need it
    { label: "Contact", href: "/contact" }, // add the page if you need it
  ];

  const socials = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      Icon: FaFacebook,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      Icon: FaTwitter,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      Icon: FaLinkedin,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      Icon: FaGithub,
    },
  ];

  return (
    <footer
      className="
        relative
        bg-slate-50 dark:bg-slate-900
        transition-all duration-500
      "
      data-aos="fade-up"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <div className="size-9 grid place-items-center rounded-lg bg-[#16A34A] text-white font-semibold dark:bg-[#22C55E] dark:text-slate-900 transition-all duration-500">
                S
              </div>
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-all duration-500">
                Stockly
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 transition-all duration-500">
              Simple product browsing and secure management — all in one place.
            </p>
          </div>

          {/* Center: Nav */}
          <nav className="text-center">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
                      text-sm font-medium
                      text-slate-700 hover:text-[#16A34A]
                      dark:text-slate-200 dark:hover:text-[#22C55E]
                      transition-all duration-500
                      focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:ring-offset-2 dark:focus:ring-[#38BDF8]
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Socials */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-full ring-1 ring-gray-200 hover:ring-transparent
                    bg-white hover:bg-[#0EA5E9]/10
                    text-slate-600 hover:text-[#0EA5E9]
                    shadow-sm
                    dark:bg-slate-800 dark:ring-slate-700
                    dark:text-slate-200 dark:hover:text-[#38BDF8] dark:hover:bg-[#38BDF8]/10
                    transition-all duration-500
                  "
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="
          border-t border-gray-200 dark:border-slate-700
          bg-white/60 dark:bg-slate-800/60
          transition-all duration-500
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-all duration-500">
            © {year} <span className="font-medium">Stockly</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
