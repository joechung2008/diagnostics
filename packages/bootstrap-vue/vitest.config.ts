import { defineVitestProject } from "@nuxt/test-utils/config";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    coverage: {
      exclude: ["app/types/**"],
      include: ["app/**/*.{ts,vue}"],
      provider: "v8"
    },
    globals: true,
    projects: [
      {
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/unit/**/*.{spec,test}.ts"]
        }
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          environment: "nuxt",
          environmentOptions: {
            nuxt: {
              rootDir: process.cwd()
            }
          },
          include: ["tests/nuxt/**/*.{spec,test}.ts"]
        }
      })
    ],
    setupFiles: "tests/setup.ts"
  }
});
