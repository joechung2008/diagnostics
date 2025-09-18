import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import { defineVitestProject } from "@nuxt/test-utils/config"

export default defineConfig({
  test: {
    coverage: {
      exclude: ["app/types/*.ts", "app/components.d.ts"],
      include: ["app/**/*.{ts,vue}"],
      provider: "v8"
    },
    globals: true,
    projects: [
      {
        plugins: [vue()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/unit/**/*.{spec,test}.{ts,js}"]
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
          include: ["tests/nuxt/**/*.{spec,test}.{ts,js}"]
        }
      })
    ],
    setupFiles: "tests/setup.ts"
  }
})
