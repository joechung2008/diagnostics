import { useEffect, useState } from "react";

const initialTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return theme;
}
