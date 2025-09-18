import { defineVitestProject } from "@nuxt/test-utils/config"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      exclude: ["app/types/*.ts"],
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
          include: ["test/unit/**/*.{spec,test}.ts"],
          setupFiles: ["test/setupTests.ts"]
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
          include: ["test/nuxt/**/*.{spec,test}.ts"]
        }
      })
    ]
  }
})
