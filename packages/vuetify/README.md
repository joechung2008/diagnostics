# diagnostics-vue

Azure Portal Extensions Dashboard implemented in Vue 3 with Vuetify

## Features

- Vue 3 + Vite application scaffolded with TypeScript
- Vuetify-powered UI components and tables for diagnostics data
- Unit tests with Vitest and component snapshots
- Small, self-contained codebase intended for local development and experimentation

## Project structure

Key files and folders:

- `src/` — main source files
  - `App.vue` — root component, fetches diagnostics data and manages tabs
  - `main.ts` — app bootstrap
  - `plugins/vuetify.ts` — Vuetify plugin setup
  - `*.vue` components — tables and extension list/detail components
  - `*.types.ts` — TypeScript props and data interfaces
  - `utils.ts` — small helpers and type guards used by components
- `public/` — static assets served by Vite
- `__tests__/` — Vitest unit tests and snapshots
- `vite.config.ts`, `tsconfig*.json`, `package.json` — build and tooling configuration

## Requirements

- Node.js (recommended LTS, e.g., 18+)
- npm (or yarn/pnpm if you prefer — this repo uses npm scripts)

Install dependencies:

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

This starts Vite and serves the app locally with hot-reload.

Build for production:

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

## Tests

Run unit tests (Vitest):

```bash
npm run test:unit
```

The `__tests__/` folder contains snapshot tests for the core components. Tests are preconfigured in `vitest.config.ts`.

## Linting and type checking

Run ESLint (project uses a shared ESLint config):

```bash
npm run lint
```

Type-check the project (Vue single-file component support):

```bash
npx vue-tsc --noEmit
```
