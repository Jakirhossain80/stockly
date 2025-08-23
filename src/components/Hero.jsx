// components/Hero.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Hero({
  title = "Manage products effortlessly with Stockly",
  subtitle = "Public product browsing and secure management — add, track, and update your inventory in one simple dashboard.",
  imageSrc = "https://i.postimg.cc/85C95ZHy/headphone.png ",
  imageAlt = "Stockly product management illustration",
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  return (
    <section
      className="
        relative
        bg-slate-50 dark:bg-slate-900
        transition-all duration-500
      "
    >
      {/* decorative accent blur */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-40 w-[70%] rounded-full bg-gradient-to-r from-[#16A34A]/15 via-[#0EA5E9]/15 to-transparent blur-2xl dark:from-[#22C55E]/15 dark:via-[#38BDF8]/15"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16
            py-16 sm:py-20 lg:py-24
          "
        >
          {/* Left: Text */}
          <div data-aos="fade-up">
            {/* Pill/Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all duration-500">
              <span className="inline-block size-2 rounded-full bg-[#16A34A] dark:bg-[#22C55E]" />
              Stockly · Simple product & stock tracking
            </div>

            {/* Headline */}
            <h1
              className="
                mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold
                text-slate-900 dark:text-slate-100
                tracking-tight
                transition-all duration-500
              "
              style={{ lineHeight: 1.15 }}
            >
              {title}
            </h1>

            {/* Subheadline */}
            <p
              className="
                mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300
                transition-all duration-500
              "
            >
              {subtitle}
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/products"
                className="
                  inline-flex justify-center items-center gap-2
                  rounded-md px-5 py-3 text-sm font-semibold
                  text-white bg-[#16A34A] hover:bg-[#15803D]
                  focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2
                  dark:bg-[#22C55E] dark:text-slate-900 dark:hover:bg-[#16A34A]
                  transition-all duration-500
                "
              >
                Get Started
                <span aria-hidden>→</span>
              </Link>

              <Link
                href="/products"
                className="
                  inline-flex justify-center items-center gap-2
                  rounded-md px-5 py-3 text-sm font-semibold
                  text-[#0EA5E9] hover:text-[#0284C7]
                  transition-all duration-500
                  dark:text-[#38BDF8] dark:hover:text-[#0EA5E9]
                "
              >
                Browse Products
              </Link>
            </div>

            {/* Small features list */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                "Public product catalog",
                "Secure dashboard",
                "Add & manage items",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 transition-all duration-500"
                >
                  <span className="inline-block size-1.5 rounded-full bg-[#16A34A] dark:bg-[#22C55E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image */}
          <div className="relative" data-aos="zoom-in">
            <div
              className="
                relative overflow-hidden rounded-2xl border
                border-gray-200 bg-white p-3 shadow-sm
                dark:border-slate-700 dark:bg-slate-800
                transition-all duration-500
              "
            >
              {/* subtle gradient backdrop */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0EA5E9]/10 via-transparent to-[#16A34A]/10 dark:from-[#38BDF8]/10 dark:to-[#22C55E]/10" />
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
              />
            </div>

            {/* floating accent blob */}
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 size-24 rounded-3xl bg-[#0EA5E9]/20 blur-xl dark:bg-[#38BDF8]/20"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
