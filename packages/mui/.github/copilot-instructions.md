# Copilot Instructions for diagnostics-mui

## Project Overview

- **Framework:** React + TypeScript, built with Vite for fast development and HMR.
- **Directory Structure:**
  - `src/`: All source code, including components, tests, and types.
  - `public/`: Static assets.
  - `coverage/`: Code coverage reports (generated).
  - `assets/`: Project-specific static assets.

## Key Components & Patterns

- **Component Structure:**
  - Each major UI feature is a `.tsx` file in `src/` (e.g., `BuildInfo.tsx`, `Configuration.tsx`).
  - Each component has a corresponding `.types.d.ts` for props/types and `.test.tsx` for tests.
  - Snapshots for tests are in `src/__snapshots__/`.
- **Styling:**
  - CSS modules (e.g., `App.css`) are colocated with components.
- **Testing:**
  - Uses Vitest for unit tests (`*.test.tsx`/`*.test.ts`).
  - Run all tests: `npm test` or `npx vitest`
  - Snapshots are auto-managed; update with `npx vitest -u`.
- **Type Checking:**
  - TypeScript strict mode is enabled via `tsconfig.*.json`.

## Developer Workflows

- **Start Dev Server:** `npm run dev` (runs Vite, HMR enabled)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (uses ESLint, see `eslint.config.js` for rules)
- **Test:** `npm test` or `npx vitest`
- **Coverage:** `npx vitest run --coverage`

## Conventions & Practices

- **Component Pattern:**
  - Keep logic, types, and tests together by feature (see `BuildInfo.*`, `Configuration.*`).
  - Prefer functional components and hooks.
  - Use explicit prop types in `.types.d.ts` files.
- **Imports:**
  - Use relative imports within `src/`.
- **Linting:**
  - ESLint config is in `eslint.config.js`. Type-aware rules are recommended (see README for expansion).
- **Testing:**
  - All components must have a corresponding test file and snapshot.

## Integration & External Dependencies

- **Vite Plugins:** Uses `@vitejs/plugin-react` or `@vitejs/plugin-react-swc` for React Fast Refresh.
- **No backend integration** is present; this is a frontend-only project.

## Examples

- To add a new component:
  1. Create `src/MyComponent.tsx`, `src/MyComponent.types.d.ts`, and `src/MyComponent.test.tsx`.
  2. Add styles in `src/App.css` or a new CSS file.
  3. Export and use in `App.tsx`.

- To run all tests and update snapshots:
  ```sh
  npx vitest -u
  ```

---

If you are unsure about a pattern, check similar files in `src/` or ask for clarification.
