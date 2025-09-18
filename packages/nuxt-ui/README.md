# diagnostics-nuxt

Azure Portal Extensions Dashboard implement in Nuxt 4 and Vue 3 using Nuxt UI

## Features

- Nuxt 4 + Vue 3 application
- TypeScript types under `app/types`
- Component tests with Vitest and @testing-library/vue
- Utilities for parsing extension manifests and reporting web vitals
- Reusable UI components in `app/components`

## Quick start

Prerequisites

- Node.js 22+ (LTS recommended)
- npm (or compatible package manager)

Install dependencies

```powershell
npm install
```

Run the development server

```powershell
npm run dev
```

Build and preview

```powershell
npm run build
npm run preview
```

Generate a static site

```powershell
npm run generate
```

Formatting, linting and tests

```powershell
npm run format        # Prettier
npm run lint          # ESLint
npm run test          # Vitest (unit & component tests)
npm run test:coverage # Tests with coverage
```

## Project structure

- `app/` - Nuxt application
  - `app.vue` - root component
  - `components/` - UI components (BuildInfo, ServerInfo, ExtensionItems, ...)
  - `types/` - TypeScript type definitions
  - `utils/` - helper utilities (extensions parsing, web vitals)
- `tests/` - unit and component tests with snapshots
- `nuxt.config.ts`, `tsconfig.json`, `package.json`, `vitest.config.ts` - core configs

## Development notes

- Type checking: `npx vue-tsc --noEmit` or rely on editor integration.
- Linting: `npm run lint`.
- Formatting: `npm run format`.
- Tests: `npm run test` (see `tests/` for component/unit tests).

## Deployment

You can deploy as a static site using `npm run generate` or as a server with `npm run build` + `npm run preview`. Configure `nuxt.config.ts` for the chosen target.
