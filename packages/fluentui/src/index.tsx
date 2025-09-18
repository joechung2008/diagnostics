import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <React.Suspense fallback={null}>
        <App />
      </React.Suspense>
    </FluentProvider>
  </React.StrictMode>
);

reportWebVitals(console.log);
