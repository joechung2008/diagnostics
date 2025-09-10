# Copilot Instructions for diagnostics

## Project Overview

- This is a Vite-based React (TypeScript) SPA for diagnostics tooling, using Fluent UI v9 for UI components.
- The main entry point is `src/index.tsx`, which renders the `App` component inside a FluentProvider.
- The app fetches diagnostics data from different Azure environments (Public, Fairfax, Mooncake) and displays build info, server info, and extension details.
- Type definitions are consolidated in `src/types.d.ts` with Vite-specific types in `src/vite-env.d.ts`.

## Key Components & Data Flow

- `App.tsx` manages environment selection, data fetching, and tab navigation.
- Diagnostics data is fetched from the selected environment's API endpoint and split into `buildInfo`, `extensions`, and `serverInfo`.
- `Extensions.tsx` lists available extensions; clicking an extension shows its details via the `Extension` component.
- `BuildInfo.tsx` and `ServerInfo.tsx` display build and server metadata, respectively.
- All types and utility functions are in `src/types.d.ts` and `src/utils.ts`.

## Developer Workflows

See [README.md](../README.md) for detailed setup instructions, prerequisites, and full list of scripts (e.g., `npm run dev`, `npm run build`, `npm run test`).

Key AI-specific notes:
- TypeScript is enforced; use `tsc --noEmit` for manual type checks (beyond the build process).
- All workflows are client-side only; no backend or server code in this repo.

## Project Conventions

- Uses Fluent UI v9 exclusively for UI; do not mix with other UI libraries.
- All environment variables must be prefixed with `REACT_APP_` to be loaded by Vite.
- Prefer functional React components and hooks; class components are not used.
- Styles are managed via Fluent UI's `makeStyles` and not global CSS (except for `index.css` resets).
- All extension navigation uses the `KeyedNavLink` type and helpers in `utils.ts`.

## Integration & Patterns

- Diagnostics data is fetched via REST from Azure endpoints; see `App.tsx` for URLs.
- No backend/server code in this repo; all logic is client-side.
- Test files are located in `src/__tests__/` and use `.test.tsx` suffix; snapshot tests are in `__snapshots__/`.
- Do not introduce Redux or other state management libraries; use React state/hooks only.

## Examples

- See `App.tsx` for environment switching and data flow.
- See `Extensions.tsx` for extension list rendering and navigation pattern.
- See `BuildInfo.tsx` and `ServerInfo.tsx` for table-based data display using Fluent UI.

---

If you are unsure about a pattern or workflow, check the referenced files or ask for clarification before making changes.
