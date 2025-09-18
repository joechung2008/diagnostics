import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@heroui/button")) {
            return "heroui-button";
          } else if (id.includes("node_modules/@heroui/dropdown")) {
            return "heroui-dropdown";
          } else if (id.includes("node_modules/@heroui/navbar")) {
            return "heroui-navbar";
          } else if (id.includes("node_modules/@heroui/table")) {
            return "heroui-table";
          } else if (id.includes("node_modules/@heroui/tabs")) {
            return "heroui-tabs";
          } else {
            return null;
          }
        },
      },
    },
  },
  plugins: [react()],
});
