# Copilot Instructions for diagnostics-solidjs

## Project Overview

This is a SolidJS-based diagnostics dashboard. The codebase is organized around modular React-like components in `src/`, each representing a distinct UI feature or data view. Types are defined in adjacent `.types.d.ts` files for strong typing and clarity.

## Key Components

- `App.tsx`: Main entry point, orchestrates layout and routing.
- `BuildInfo.tsx`, `Configuration.tsx`, `Extension.tsx`, `Extensions.tsx`, `ServerInfo.tsx`, `StageDefinition.tsx`: Feature modules, each with a corresponding types file.
- `utils.ts`: Shared utility functions.
- `styles.css`: Global styles.

## Testing

- All tests are colocated in `src/__tests__` and use `.test.tsx` or `.test.ts` naming.
- Run tests with: `npm test` (see `package.json` for scripts).
- Use `setupTests.ts` for test environment setup.

## Build & Run

- Local dev server: `npm run dev` (uses Vite, see `vite.config.ts`).
- Production build: `npm run build`.
- Preview build: `npm run preview`.

## Linting & Formatting

- Lint: `npm run lint` (configured via `eslint.config.ts`).
- Type-check: `npm run typecheck` (uses `tsconfig.json`).

## Patterns & Conventions

- Each feature module has a `.tsx` and `.types.d.ts` file for separation of logic and types.
- Prefer functional components and hooks; avoid class components.
- Use explicit imports from `solid-js` and avoid default imports.
- Shared logic goes in `utils.ts`.
- Tests should mock external dependencies and focus on component behavior.

## Integration Points

- No backend integration detected; all data appears local or static.
- External dependencies managed via `package.json`.
- Coverage reports generated in `coverage/` after tests.

## Example Workflow

1. Add a new feature: create `Feature.tsx` and `Feature.types.d.ts` in `src/`.
2. Add tests in `src/__tests__/Feature.test.tsx`.
3. Run `npm run dev` to verify UI, `npm test` for coverage.
4. Update types and utilities as needed.

## References

- `src/` for all source code and types
- `src/__tests__/` for tests
- `coverage/` for test coverage reports
- `vite.config.ts`, `eslint.config.ts`, `tsconfig.json` for build/lint/type settings

---

If any section is unclear or missing, please provide feedback for further refinement.
