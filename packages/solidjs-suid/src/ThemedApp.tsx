import { ThemeProvider, createTheme } from "@suid/material";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import App from "./App";

export default function ThemedApp() {
  const getSystemMode = (): "dark" | "light" =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const [mode, setMode] = createSignal<"dark" | "light">(getSystemMode());

  createEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light");
    media.addEventListener("change", handler);
    onCleanup(() => media.removeEventListener("change", handler));
  });

  const theme = createMemo(() =>
    createTheme({
      palette: {
        mode: mode(),
      },
    })
  );

  createEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default;
  });

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
