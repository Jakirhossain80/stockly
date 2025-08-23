// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Stockly",
  description: "Stockly — Products with public browsing & secure management",
};

export default function RootLayout({ children }) {
  return (
    // Allow next-themes to toggle class="dark" on <html>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-slate-600 dark:text-slate-300">Loading…</p>
            </div>
          }
        >
          <Providers>
            {/* Add top padding because Navbar is fixed (h-16) */}
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
