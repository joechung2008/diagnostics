import { createTheme, useMediaQuery } from "@mui/material";
import { useLayoutEffect, useMemo } from "react";

export function useSystemTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useLayoutEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = theme.palette.background.default;
      document.body.style.color = theme.palette.text.primary;
    }
  }, [theme]);

  return theme;
}
