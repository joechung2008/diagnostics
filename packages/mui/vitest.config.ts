import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
    dir: "./src",
    environment: "jsdom",
    root: __dirname,
    setupFiles: ["./setupTests.ts"],
    snapshotFormat: {
      escapeString: false,
      printBasicPrototype: false,
    },
  },
});
