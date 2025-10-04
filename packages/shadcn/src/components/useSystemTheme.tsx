import { useEffect } from "react";

export function useTheme() {
  useEffect(() => {
    // Set initial theme.
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    window.document.documentElement.classList.remove("light", "dark");
    window.document.documentElement.classList.add(systemTheme);

    // React to changes in system theme.
    const handleChange = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? "dark" : "light";
      window.document.documentElement.classList.remove("light", "dark");
      window.document.documentElement.classList.add(systemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
}
