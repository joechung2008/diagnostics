import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemedApp from "./ThemedApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemedApp>
      <App />
    </ThemedApp>
  </React.StrictMode>
);

reportWebVitals(console.log);
