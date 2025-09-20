/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: process.cwd(),
  },
};
