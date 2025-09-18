import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // point imports of 'antd' to the package's main lib entry to avoid resolution issues
      antd: path.resolve(__dirname, "node_modules/antd/lib/index.js"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/antd/lib/config-provider") ||
            id.includes("node_modules/antd/lib/theme")
          ) {
            return "antd_config_provider_theme";
          } else if (id.includes("node_modules/antd/lib/flex")) {
            return "antd_flex";
          } else if (id.includes("node_modules/antd/lib/menu")) {
            return "antd_menu";
          } else if (id.includes("node_modules/antd/lib/table")) {
            return "antd_table";
          } else if (id.includes("node_modules/antd/lib/tabs")) {
            return "antd_tabs";
          } else if (id.includes("node_modules/antd/lib/typography")) {
            return "antd_typography";
          } else {
            return null;
          }
        },
      },
    },
  },
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        "**/*.d.ts",
        "**/*.config.ts",
        "src/reportWebVitals.ts",
        "eslint.config.js",
      ],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/setupTests.ts"],
  },
});
