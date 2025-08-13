import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      exclude: ["src/reportWebVitals.ts", "src/**/*.d.ts"],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
