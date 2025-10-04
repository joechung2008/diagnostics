import { useEffect, useState } from "react";

export function useSystemTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      // Remove existing theme classes and add the new one
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);
    };

    // Initial check
    const initialTheme = mediaQuery.matches ? "dark" : "light";
    setTheme(initialTheme);
    // Remove existing theme classes and add the new one
    document.body.classList.remove("light", "dark");
    document.body.classList.add(initialTheme);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return theme;
}
