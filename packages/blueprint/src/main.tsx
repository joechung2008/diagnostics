import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals.ts";
import ThemedApp from "./ThemedApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>
);

reportWebVitals(console.log);
