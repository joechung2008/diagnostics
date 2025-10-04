import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemedMantineProvider } from "./ThemedMantineProvider";
import reportWebVitals from "./reportWebVitals";

import "@mantine/core/styles.css";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemedMantineProvider>
      <App />
    </ThemedMantineProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
