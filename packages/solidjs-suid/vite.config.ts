import { defineConfig } from "vitest/config";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  build: {
    target: "esnext",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/setupTests.ts",
    coverage: {
      exclude: [
        "**/*.d.ts",
        "dist/**",
        "src/reportWebVitals.ts",
        "**.config.ts",
      ],
      provider: "v8",
    },
  },
});
