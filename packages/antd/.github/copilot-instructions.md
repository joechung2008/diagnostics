# Copilot Instructions for diagnostics-ant

## Project Overview

- This is a React + TypeScript project using Vite for development and build.
- The codebase is organized under `src/` with each major UI component in its own `.tsx` and `.types.d.ts` file.
- Vite configuration is in `vite.config.ts`. TypeScript configs are in `tsconfig*.json`.
- No backend code is present; this is a frontend-only project.

## Key Patterns & Conventions

- **Component Structure:** Each UI component (e.g., `BuildInfo`, `Configuration`, `Extension`, `ServerInfo`, `StageDefinition`, `Extensions`) has a `.tsx` file for logic/UI and a `.types.d.ts` for props/types.
- **Styling:** Styles are in `.css` files (e.g., `App.css`).
- **Type Definitions:** Shared types are in `src/types.d.ts` and per-component types in `*.types.d.ts`.
- **Utilities:** Shared logic is in `src/utils.ts`.
- **Assets:** Static assets are in `src/assets/` and `public/`.

## Developer Workflows

- **Development:**
  - Start dev server: `npm run dev`
  - Build for production: `npm run build`
  - Preview production build: `npm run preview`
- **Linting:**
  - Lint: `npm run lint` (uses ESLint, see `eslint.config.js`)
  - ESLint config is type-aware; see `README.md` for advanced setup.
- **Testing:**
  - No test framework or scripts are present by default.

## Integration & External Dependencies

- Uses Vite plugins for React (`@vitejs/plugin-react` or `@vitejs/plugin-react-swc`).
- No custom API integrations or backend communication in this repo.

## Project-Specific Notes

- Follow the pattern of pairing each component with a `*.types.d.ts` file for type safety.
- When adding new components, place them in `src/` and follow the existing naming conventions.
- Update `vite.config.ts` and `tsconfig*.json` as needed for new features or paths.

## References

- See `README.md` for ESLint and TypeScript configuration tips.
- Example component: `src/BuildInfo.tsx` + `src/BuildInfo.types.d.ts`.
- Main entry: `src/main.tsx`.

---

If you are unsure about a pattern or workflow, check the `README.md` or look for similar examples in `src/`.
