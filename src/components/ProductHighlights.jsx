// components/ProductHighlights.jsx
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiCamera,
  FiHeadphones,
  FiMonitor,
  FiWatch,
} from "react-icons/fi";


export default function ProductHighlights({
  title = "Product Highlights",
  subtitle = "A quick peek at what makes Stockly simple, fast, and delightful for managing your products.",
  items,
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  // Fallback highlights if none provided
  const highlights =
    items ??
    [
      {
        icon: <FiCamera className="text-2xl" />,
        title: "Rich Product Cards",
        desc: "Show clean product cards with images, names, and quick details for fast scanning.",
      },
      {
        icon: <FiHeadphones className="text-2xl" />,
        title: "Public Browsing",
        desc: "Let anyone explore products, while you securely manage them in your dashboard.",
      },
      {
        icon: <FiMonitor className="text-2xl" />,
        title: "Modern UI",
        desc: "Built with Next.js & Tailwind for a smooth, responsive experience across devices.",
      },
      {
        icon: <FiWatch className="text-2xl" />,
        title: "Fast Add & Edit",
        desc: "Add products in seconds and keep descriptions up to date with ease.",
      },
    ];

  return (
    <section
      className="
        relative
        bg-slate-50 dark:bg-slate-900
        transition-all duration-500
      "
    >
      {/* decorative gradient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-24 w-[70%] rounded-full bg-gradient-to-r from-[#16A34A]/15 via-[#0EA5E9]/15 to-transparent blur-2xl dark:from-[#22C55E]/15 dark:via-[#38BDF8]/15"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Heading */}
        <div className="text-center" data-aos="fade-up">
          <h2
            className="
              text-3xl sm:text-4xl font-extrabold
              text-slate-900 dark:text-slate-100
              tracking-tight
              transition-all duration-500
            "
            style={{ lineHeight: 1.15 }}
          >
            {title}
          </h2>
          <p
            className="
              mt-3 max-w-2xl mx-auto
              text-slate-600 dark:text-slate-300
              transition-all duration-500
            "
          >
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <ul
          className="
            mt-10 grid gap-5
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {highlights.map((h, idx) => (
            <li
              key={idx}
              data-aos="zoom-in"
              className="
                group
                rounded-2xl border border-gray-200 dark:border-slate-700
                bg-white dark:bg-slate-800
                shadow-sm
                transition-all duration-500
                hover:shadow-md hover:-translate-y-0.5
              "
            >
              <div className="p-6">
                {/* Icon badge */}
                <div
                  className="
                    inline-flex items-center justify-center
                    size-12 rounded-xl
                    text-white
                    bg-gradient-to-br from-[#16A34A] to-[#0EA5E9]
                    dark:from-[#22C55E] dark:to-[#38BDF8]
                    ring-1 ring-white/40 dark:ring-slate-700/40
                    shadow-sm
                    transition-all duration-500
                    group-hover:scale-[1.03]
                  "
                  aria-hidden
                >
                  {h.icon}
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-4 text-lg font-semibold
                    text-slate-900 dark:text-slate-100
                    transition-all duration-500
                  "
                >
                  {h.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-2 text-sm
                    text-slate-600 dark:text-slate-300
                    transition-all duration-500
                  "
                >
                  {h.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
