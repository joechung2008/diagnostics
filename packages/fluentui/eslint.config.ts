import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactDomPlugin from "eslint-plugin-react-dom";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react-x";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "build",
    "coverage",
    "playwright-report",
    "test-results",
    "src/**/*.d.ts",
  ]),
  ...tseslint.configs.recommended,
  reactPlugin.configs["recommended-typescript"],
  reactDomPlugin.configs.recommended,
  reactRefreshPlugin.configs.vite,
  reactHooksPlugin.configs.flat.recommended,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
