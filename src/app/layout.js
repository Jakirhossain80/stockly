// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ThemeProvider from "../components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {/* Fixed Navbar (h-16). Add padding-top to main so content isn't hidden */}
          <Navbar />
          <main className="pt-16">
            <Suspense
              fallback={
                <div className="min-h-[50vh] flex items-center justify-center">
                  <p className="text-slate-600 dark:text-slate-300">Loading…</p>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
