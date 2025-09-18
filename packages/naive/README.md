# diagnostics-naive

Azure Portal Extensions Dashboard implemented in Nuxt 4 with Naive UI

This repository contains a small dashboard app that displays Azure Portal extension diagnostics using Nuxt 4 and Naive UI.

## Quick start

Prerequisites: Node.js v18+ and npm.

1. Install dependencies

```bash
npm install
```

2. Run in development mode

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

4. Run tests

```bash
npm test
npm run test:coverage
```

## What you'll find here

- A Nuxt 4 app using Vue 3 and Naive UI components to render diagnostics and extension data.
- Lightweight utilities in `utils/` for extension lookups and web-vitals reporting.
- Component-based UI in `app/components/` with corresponding TypeScript prop types in `app/types/`.
- Tests under `tests/` (unit and component specs) using Vitest and Vue Test Utils.

## Project structure (high level)

- `app/` — Nuxt application code and UI components
  - `components/` — Vue components (BuildInfo, Configuration, Extension, Extensions, ServerInfo, StageDefinition)
  - `assets/` — global CSS
  - `types/` — TypeScript interfaces for props and models
- `utils/` — helper modules (e.g., `extensions.ts`, `reportWebVitals.ts`)
- `tests/` — unit and integration tests
- `public/` — static assets

## Scripts

Common npm scripts are defined in `package.json`:

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview built app
- `npm test` — run tests (Vitest)
- `npm run test:coverage` — run tests with coverage
- `npm run lint` — run linters
- `npm run format` — run Prettier
