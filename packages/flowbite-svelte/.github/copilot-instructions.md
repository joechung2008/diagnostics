# Copilot Instructions for diagnostics-sv

This project is a SvelteKit app (see `svelte.config.js`, `vite.config.ts`, and `src/`). It uses TypeScript, Vite, and Svelte 5 (latest syntax). The main UI logic is in `src/lib/components/` and routes are in `src/routes/`.

## Architecture & Patterns

- **Component Structure:**
  - UI is built from Svelte components in `src/lib/components/` (e.g., `BuildInfo.svelte`, `Extension.svelte`).
  - Types for component props and data are in `src/lib/App.types.d.ts` and related files.
  - Route-level logic and layouts are in `src/routes/` (e.g., `+layout.svelte`, `+page.svelte`).
- **Data Flow:**
  - Data is passed via props between components. There is no global state management by default.
  - For new data types, define types in `src/lib/*.types.d.ts` and use them in components.
- **Styling:**
  - Use local `<style>` blocks in Svelte components. Global styles are in `src/app.css`.
- **Assets:**
  - Place static assets (e.g., images, robots.txt) in `static/` (served at root URL).
  - Component-specific assets (e.g., icons) go in `src/lib/assets/`.

## Developer Workflows

- **Install dependencies:**
  - `npm install`
- **Start dev server:**
  - `npm run dev` (see `README.md` for more)
- **Build for production:**
  - `npm run build`
- **Preview production build:**
  - `npm run preview`
- **Type checking:**
  - `npm run check` (runs `svelte-check`)
- **Linting & formatting:**
  - `npm run lint` (ESLint + Prettier)
  - `npm run format` (Prettier)
- **Sync SvelteKit config:**
  - `npm run prepare` (runs `svelte-kit sync`). Run this after changing dependencies or SvelteKit config files.

## Conventions & Tips

- **TypeScript:**
  - All Svelte components use `lang="ts"` in `<script>` blocks.
  - Types are colocated in `src/lib/*.types.d.ts`.
- **Component Imports:**
  - Import sibling components with relative paths (e.g., `import X from './X.svelte'`).
- **State management:**
  - No custom state management libraries are used. Use Svelte's built-in reactivity and props. If you need stores, prefer Svelte's built-in stores.
- **Formatting & linting:**
  - Use Prettier and ESLint via `npm run format` and `npm run lint`.
- **Adapters:**
  - The default adapter is `@sveltejs/adapter-auto`. For deployment, see SvelteKit docs.

## Key Files

- `src/lib/components/` — Main UI components
- `src/lib/*.types.d.ts` — Shared TypeScript types
- `src/routes/` — Route and layout Svelte files
- `vite.config.ts`, `svelte.config.js` — Build and SvelteKit config
- `package.json` — Scripts and dependencies
- `static/` — Public static assets

## Example: Adding a New Component

1. Create `src/lib/components/MyComponent.svelte` with `<script lang="ts">`.
2. Define prop types in `src/lib/MyComponent.types.d.ts` if needed.
3. Import and use in a parent component or route.

---

**Testing:** This repository uses Vitest with @testing-library/svelte for unit and integration tests. Tests live under `src/` next to the code they exercise (e.g. `src/lib/components/*.spec.ts`, `src/routes/*.spec.ts`). The project includes a `src/setup.ts` test setup file and Vitest is configured in `vite.config.ts` to discover `src/**/*.{spec,test}.{ts,js,svelte}` files. See `TESTING.md` at the repository root for detailed instructions, testing patterns (mocking svelte-query, stubbing Flowbite components), and tips for stable tests.

---

For more, see the [README.md](../README.md), `TESTING.md`, or the SvelteKit documentation.
