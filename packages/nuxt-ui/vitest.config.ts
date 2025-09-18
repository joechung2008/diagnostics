import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": `${__dirname}/app`,
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    // https://vitest.dev/config/#coverage
    coverage: {
      exclude: [
        "node_modules/",
        ".nuxt/",
        ".output/",
        "app/coverage/",
        "app/types/**",
        "app/vendor/**",
        ".nuxt-test",
      ],
      include: ["app/**/*.{js,jsx,ts,tsx,vue}"],
      provider: "v8",
    },
    globals: true,
    projects: [
      {
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/unit/**/*.spec.ts"],
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          environment: "nuxt",
          environmentOptions: {
            nuxt: {
              rootDir: process.cwd(),
            },
          },
          include: ["tests/nuxt/**/*.spec.ts"],
        },
      }),
    ],
  },
});
