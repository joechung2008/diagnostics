/// <reference types="node" />

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: process.cwd()
    }
  },
  rules: {
    "vue/multi-word-component-names": "off"
  }
});
