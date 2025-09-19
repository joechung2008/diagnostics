import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
  preview: {
    allowedHosts: ["diagnostics-0jjo.onrender.com"],
    host: "0.0.0.0",
    port: 10000
  },
  resolve: {
    conditions: mode === "test" ? ["browser"] : undefined
  },
  test: {
    include: ["src/**/*.{test,spec}.{ts,js,svelte}"],
    coverage: {
      exclude: ["src/**/*.d.ts"],
      include: ["src/**/*.{svelte,ts}"]
    },
    environment: "jsdom",
    globals: true,
    setupFiles: [resolve(__dirname, "src/setup.ts")]
  }
}));
