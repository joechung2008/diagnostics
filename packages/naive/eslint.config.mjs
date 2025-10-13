// @ts-check
import { parser as tsParser } from "typescript-eslint"
import vueParser from "vue-eslint-parser"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module"
      }
    }
  },
  {
    rules: {
      "vue/multi-word-component-names": "off"
    }
  }
)
