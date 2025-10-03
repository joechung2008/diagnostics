import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useSystemTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const newTheme: Theme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-bs-theme", newTheme);
    };

    // Set initial theme
    updateTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return theme;
};
