"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"         // adds 'class="dark"' on <html> for dark
      defaultTheme="system"     // light/dark based on OS by default
      enableSystem
      enableColorScheme         // sets <meta name="color-scheme">
      disableTransitionOnChange // avoids janky color transitions
    >
      {children}
    </NextThemesProvider>
  );
}
