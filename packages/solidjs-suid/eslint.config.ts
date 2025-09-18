import solidPlugin from "eslint-plugin-solid";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  globalIgnores(["coverage", "dist", "src/**/*.d.ts"]),
  ...tseslint.configs.recommended,
  solidPlugin.configs["flat/typescript"],
  prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error"],
    },
  },
];
