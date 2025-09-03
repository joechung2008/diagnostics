import reactDomPlugin from "eslint-plugin-react-dom";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react-x";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  globalIgnores(["build", "coverage", "dist", "src/**/*.d.ts", "*.config.ts"]),
  ...tseslint.configs.recommended,
  reactPlugin.configs["recommended-typescript"],
  reactDomPlugin.configs.recommended,
  reactHooksPlugin.configs["recommended-latest"],
  reactRefreshPlugin.configs.vite,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
];
