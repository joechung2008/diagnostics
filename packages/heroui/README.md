# diagnostics-heroui

Azure Portal Extensions Dashboard implemented in React with Hero UI

## Features

- Small, focused React app using Hero UI and Tailwind CSS
- Fast local dev with Vite
- TypeScript support and linting (ESLint + Prettier)
- Unit testing with Vitest and Testing Library
- Example components: `BuildInfo`, `ServerInfo`, `Extensions`, `Extension`, `Configuration`, `StageDefinition`

## Tech stack

- React
- Hero UI (`@heroui/react`)
- Vite (dev server + build)
- TypeScript
- Tailwind CSS
- Vitest + Testing Library for tests

## Requirements

- Node.js (LTS recommended) and npm
- A modern browser for running the app

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run the development server (hot reload)

```bash
npm run dev
```

3. Open the app

   Visit the URL printed by Vite (usually http://localhost:5173)

## Build & preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

This project exposes the following npm scripts (in `package.json`):

- `npm run dev` — start Vite dev server
- `npm run build` — run all build steps
- `npm run build:tsc` — TypeScript build (`tsc -b`)
- `npm run build:vite` — Vite production build
- `npm run preview` — preview built output
- `npm run test` — run tests once (Vitest)
- `npm run test:watch` — run tests in watch mode
- `npm run test:coverage` — run tests with coverage
- `npm run lint` — run ESLint
- `npm run format` — run Prettier and format the repo

Use these scripts with `npm run <script>`.

## Testing

Unit tests live under `src/__tests__` and are written with Vitest and Testing Library. Run tests with:

```bash
npm run test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

## Project structure (high level)

- `index.html` — Vite entry HTML
- `src/` — application source
  - `App.tsx` — root app component
  - `index.tsx` — React entry file
  - `BuildInfo.tsx`, `ServerInfo.tsx`, `Extensions.tsx`, `Extension.tsx`, `Configuration.tsx`, `StageDefinition.tsx` — main UI components
  - `utils.ts`, `types.d.ts` — helper utilities and global types
  - `index.css` — Tailwind / global styles
  - `__tests__/` — unit tests and snapshots

## Notes

- This project is intentionally small and focused on local development and examples. It demonstrates how to combine Hero UI with a Vite + React toolchain.
- The codebase includes snapshots for key components to make refactors safer.
