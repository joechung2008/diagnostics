# Copilot Instructions for diagnostics-vue

## Project Overview

- **Framework:** Vue 3 + Vite, TypeScript, Vuetify UI
- **Purpose:** Diagnostics dashboard for Azure environments (Public, Fairfax, Mooncake)
- **Main entry:** `src/main.ts` mounts `App.vue` with Vuetify and web-vitals reporting.

## Architecture & Data Flow

- **App.vue** is the root component. It fetches diagnostics data from environment-specific endpoints and manages tabs for Extensions, Build Info, and Server Info.
- **Diagnostics data** structure: see `App.type.ts` for the main interface. Data includes `buildInfo`, `extensions`, and `serverInfo`.
- **Extensions**: Rendered via `ExtensionItems.vue` (list) and `ExtensionItem.vue` (details). Extension types are defined in `ExtensionItems.types.ts`.
- **Tables**: Build, Server, Configuration, and Stage Definition tables are modular components, each with a corresponding `.types.ts` for props.
- **Utils**: `utils.ts` provides helpers for type guards and navigation link conversion.
- **Styling**: Uses Vuetify components and scoped CSS in `.vue` files.

## Developer Workflows

- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Run unit tests:** `npm run test:unit` (uses Vitest, config in `vitest.config.ts`)
- **Lint:** `npm run lint` (ESLint config in `eslint.config.ts`)
- **Type checking:** Use `vue-tsc` for `.vue` files (see README for Volar setup)

## Conventions & Patterns

- **Type safety:** All props/interfaces for components are defined in adjacent `.types.ts` files.
- **Environment switching:** Managed in `App.vue` via a menu; endpoints are hardcoded in the `Environments` object.
- **Extension rendering:** Use type guards (`isExtensionInfo`) to distinguish between info and error types.
- **Navigation links:** Use `KeyedNavLink` (see `types.ts`) for extension navigation.
- **Component communication:** Props are passed explicitly; no Vuex or global state.
- **Testing:** Unit tests are expected in `src/__tests__/` (not shown, but referenced in ESLint config).
  - App component tests use Vitest snapshots (`toMatchSnapshot()`), with snapshots stored in `src/__tests__/__snapshots__/App.spec.ts.snap`.
  - The `when` helper in `src/utils.ts` is covered by unit tests in `src/__tests__/utils.spec.ts`.

## Integration Points

- **External APIs:** Diagnostics data is fetched from Azure endpoints (see `App.vue`).
- **UI Library:** Vuetify is set up in `src/plugins/vuetify.ts` and configured in `vite.config.ts`.
- **Icons:** Uses Material Design Icons via Vuetify.
- **Web Vitals:** Performance metrics are logged via `reportWebVitals.ts`.

## Key Files & Directories

- `src/App.vue` — main logic, environment switching, data fetching
- `src/App.type.ts` — diagnostics data structure
- `src/ExtensionItems.vue` / `src/ExtensionItem.vue` — extension list/detail
- `src/utils.ts` — type guards, navigation helpers
- `src/plugins/vuetify.ts` — Vuetify setup
- `vite.config.ts` / `vitest.config.ts` / `eslint.config.ts` — build, test, lint configs

---

**If you are an AI agent, follow these conventions and workflows. If any section is unclear or missing, ask for clarification or examples from the user.**
