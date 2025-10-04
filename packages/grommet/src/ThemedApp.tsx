import { Grommet } from "grommet";
import { grommet, dark } from "grommet/themes";
import React, { useEffect, useState } from "react";

interface ThemedAppProps {
  children: React.ReactNode;
}

const ThemedApp: React.FC<ThemedAppProps> = ({ children }) => {
  const [theme, setTheme] = useState(grommet);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? dark : grommet);
    };

    // Set initial theme
    setTheme(mediaQuery.matches ? dark : grommet);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return <Grommet theme={theme}>{children}</Grommet>;
};

export default ThemedApp;
