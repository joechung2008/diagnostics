# Generic Instructions for GitHub Copilot

When generating code, please adhere to the following guidelines:

- Organize imports according to ESLint rules.
- Use `npm run check` to ensure code quality.
- Use `npm run format` to adhere to code style guidelines.
- Use `npm run link` to adhere to code lint guidelines.
- Use `$lib` import before drilling down into `$lib/...`.
  - Use relative paths instead when importing from within `$lib`.
- Use types in src/app.d.ts before making new local types.

# Svelte-specific Instructions for GitHub Copilot

When generating Svelte code, please adhere to the following guidelines:

- Use Svelte 5 syntax. Do not use legacy mode syntax.
- Use Carbon Components Svelte for UI components and styling.
