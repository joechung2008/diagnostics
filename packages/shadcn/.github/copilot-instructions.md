# Copilot Instructions for diagnostics-shadcn

## Project Overview

- **Type:** React + TypeScript SPA using Vite, Tailwind CSS, and shadcn/ui patterns.
- **Entry Point:** `src/index.tsx` renders `App` into the DOM.
- **Main App:** `src/App.tsx` orchestrates environment selection, extension loading, and navigation.
- **UI Components:** Custom UI in `src/components/ui/` (tabs, navigation-menu, etc.), following shadcn/ui conventions.
- **Utilities:** Shared helpers in `src/lib/utils.ts` (e.g., `cn`, `isExtensionInfo`, `byKey`).
- **Types:** Shared types in `src/types.d.ts` and `*.types.d.ts` files.

## Key Patterns & Conventions

- **Path Aliases:** Use `@/` to import from `src/` (see `vite.config.ts`).
- **Extension Model:** Extensions are objects keyed by name, filtered/processed via `isExtensionInfo` and `toNavLink`.
- **Environment Selection:** `App.tsx` manages cloud environment switching (Public, Fairfax, Mooncake) and resets extension state on change.
- **Navigation:** Navigation and tabs use shadcn/ui primitives, with state managed in `App.tsx`.
- **Styling:** Tailwind CSS is used throughout; utility `cn` merges class names.
- **Testing:** Vitest and Testing Library; tests in `src/__tests__/`, snapshots in `__snapshots__/`.
- **No Fluent UI:** `KeyedNavLink` is defined locally (see `types.d.ts`).

## Developer Workflows

- **Install:** `npm ci`
- **Dev Server:** `npm run dev` (Vite, HMR enabled)
- **Build:** `npm run build` (runs both TypeScript and Vite builds)
- **Test:** `npm run test` (unit tests), `npm run test:coverage` (with coverage)
- **Lint/Format:** `npm run lint`, `npm run format`
- **Preview:** `npm run preview` (serves built app)
- **CI:** See `.github/workflows/ci.yml` for build/test/coverage on push/PR to `main`.

## Integration & External Dependencies

- **shadcn/ui:** UI primitives are customized and imported from `src/components/ui/`.
- **Radix UI:** Used for accessible UI primitives (see dependencies).
- **Tailwind CSS:** Configured via Vite plugin.
- **No backend:** All data is loaded client-side; environments are API endpoints.

## Examples

- **Add a new extension:**
  - Implement logic in `src/Extensions.tsx` and update types in `src/types.d.ts`.
  - Use `isExtensionInfo` and `toNavLink` for filtering/mapping.
- **Add a new environment:**
  - Update the `Environment` object and related logic in `App.tsx`.

## References

- `README.md`: Vite/React/ESLint setup details.
- `vite.config.ts`: Path aliases, plugin setup.
- `src/lib/utils.ts`: Utility functions for type guards, navigation, and class merging.
- `src/components/ui/`: Custom UI primitives.
- `.github/workflows/ci.yml`: CI pipeline.

---

If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.
