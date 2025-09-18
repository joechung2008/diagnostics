# diagnostics-tremor

Azure Portal Extensions Dashboard implemented in React 18 with Tremor

## Features

- Browse and preview extension metadata used in Azure Portal scenarios
- Lightweight React 18 app bootstrapped with Vite
- Fast dev server, unit tests with Vitest, and linting with ESLint + Prettier

## Quick start

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser (Vite will print the exact URL).

## Available scripts

These scripts are defined in `package.json` and are the recommended way to run common tasks:

- `npm run dev` — Start the Vite development server
- `npm run build` — Run all build steps (uses `run-s` to run build subtasks)
- `npm run build:tsc` — TypeScript build (`tsc -b`)
- `npm run build:vite` — Vite production build
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint across the codebase
- `npm run format` — Format code with Prettier
- `npm run test` — Run Vitest tests once
- `npm run test:watch` — Run Vitest in watch mode for TDD
- `npm run test:coverage` — Run tests and collect coverage

If you prefer yarn or pnpm, use the equivalent commands (e.g., `yarn` / `pnpm install`, `yarn dev`).

## Project layout

Key folders and files:

- `src/` — Main application source (React components and tests)
- `src/components` — Reusable UI components
- `src/__tests__/` — Unit tests and snapshots
- `public/` — Static assets served by Vite
- `vite.config.ts`, `tsconfig.json` — Build and TypeScript configuration

## Testing

This project uses Vitest for unit tests. Run the full test suite with:

```bash
npm run test
```

To run tests while you develop, use:

```bash
npm run test:watch
```

Coverage reports are produced with:

```bash
npm run test:coverage
```

## Linting and formatting

Run ESLint to find problems:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```

## Notes

- This README keeps the project-specific commands and developer workflow. For environment-specific needs (Node version, editor settings), check the repository root files.
- The app is intentionally small; most of the behavior lives under `src/`. If you need to extend data sources or add APIs, prefer adding a clear, small integration with tests.
