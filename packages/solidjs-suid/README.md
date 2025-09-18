# diagnostics-solid

Azure Portal Extensions Dashboard implemented in SolidJS and SUID

## Key Features

- Componentized SolidJS UI with clear separation of concerns
- Type definitions colocated with components for easy maintenance
- Unit tests for each UI component (Jest + Testing Library)
- Fast local development with Vite

## Getting started

Prerequisites: Node.js (LTS) and npm.

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser (Vite's default) and explore the UI.

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Scripts

Common scripts available in `package.json`:

- `dev` — start Vite dev server
- `build` — create a production build
- `preview` — locally preview the production build
- `test` — run unit tests
- `lint` — run ESLint
- `typecheck` — run TypeScript checks

## Project layout

- `src/` — source files
  - `App.tsx` — app entry
  - `ThemedApp.tsx` — theme wrapper
  - `BuildInfo.tsx`, `Configuration.tsx`, `Extension.tsx`, `Extensions.tsx`, `ServerInfo.tsx`, `StageDefinition.tsx` — feature components
  - `*.types.d.ts` — types alongside components
  - `__tests__/` — unit tests
- `index.html`, `vite.config.ts` — Vite entry and config
- `package.json`, `tsconfig.json`, `eslint.config.ts` — tooling configuration

## Testing

Tests are located under `src/__tests__`. The test environment is set up in `setupTests.ts`. When adding or modifying components, please add a unit test that covers the primary behavior.
