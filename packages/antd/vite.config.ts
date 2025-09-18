import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/antd/es/config-provider") ||
            id.includes("node_modules/antd/es/theme")
          ) {
            return "antd_config_provider_theme";
          } else if (id.includes("node_modules/antd/es/flex")) {
            return "antd_flex";
          } else if (id.includes("node_modules/antd/es/menu")) {
            return "antd_menu";
          } else if (id.includes("node_modules/antd/es/table")) {
            return "antd_table";
          } else if (id.includes("node_modules/antd/es/tabs")) {
            return "antd_tabs";
          } else if (id.includes("node_modules/antd/es/typography")) {
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
