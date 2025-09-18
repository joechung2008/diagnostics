import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "coverage",
        "dist",
        "*.config.{js,ts}",
        "src/*.d.ts",
        "src/hero.ts",
        "src/index.tsx",
        "src/reportWebVitals.ts",
      ],
    },
    environment: "jsdom",
  },
});
