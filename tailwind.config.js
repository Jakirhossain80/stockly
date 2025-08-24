/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ← important
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}", // ← if you use /src, keep this
  ],
  theme: { extend: {} },
  plugins: [],
};
