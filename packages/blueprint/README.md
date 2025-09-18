# diagnostics-blueprint

Azure Portal Extensions Dashboard implemented in React 18 with Blueprint.

## Features

- Small, focused React UI built with Vite and TypeScript
- Component-per-file pattern with companion `*.types.d.ts` files for prop types
- UI built with Blueprint (lightweight, composable components)
- Zero-backend: static app intended to render diagnostic payloads and extension metadata
- Lightweight unit tests for core components

## Getting started

Prerequisites

- Node.js 22+ (LTS recommended)
- npm

Install dependencies

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

Open http://localhost:5173/ (or the port printed by Vite) to view the app.

Build for production

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

Run tests

```bash
npm test
```

Run linter

```bash
npm run lint
```

## Project layout

Top-level files

- `index.html` — Vite entry
- `vite.config.ts` — Vite configuration
- `package.json` — npm scripts and dependencies
- `tsconfig*.json` — TypeScript configurations

`src/`

- `main.tsx` — app bootstrap
- `App.tsx`, `ThemedApp.tsx` — top-level app components
- `*.tsx` — UI components (each with a matching `*.types.d.ts` for props)
- `utils.ts` — small shared helpers
- `__tests__/` — unit tests and snapshots

`public/`

- static assets (favicon, robots, etc.)

## Conventions

- Components follow a one-file-per-component pattern with a companion `*.types.d.ts` for exported prop types.
- Prefer colocating visual and logic concerns inside the component file for small components.
- Add unit tests for new behavior in `*.test.tsx` alongside components.

## Linting and formatting

- ESLint is configured via `eslint.config.ts`.
- Run `npm run lint` to check lint issues and adjust rules in `eslint.config.ts` when needed.
