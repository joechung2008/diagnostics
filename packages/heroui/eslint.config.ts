import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactDomPlugin from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react-x";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["coverage", "dist", "**/*.d.ts"]),
  ...tseslint.configs.recommended,
  reactPlugin.configs["recommended-typescript"],
  reactDomPlugin.configs.recommended,
  reactRefresh.configs.vite,
  prettierConfig,
  {
    extends: ["react-hooks/recommended"],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
        tsconfigdir: import.meta.dirname,
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
