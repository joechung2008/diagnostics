import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint, { parser } from "typescript-eslint";

export default [
  globalIgnores(["build", "coverage", "dist", "src/**/*.d.ts", "*.config.ts"]),
  ...tseslint.configs.recommended,
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
