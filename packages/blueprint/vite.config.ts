import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        "*.config.{js,ts}",
        "dist",
        "src/main.tsx",
        "src/reportWebVitals.ts",
        "src/**/*.d.ts",
        "src/setupTests.ts",
      ],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "src/setupTests.ts",
  },
});
