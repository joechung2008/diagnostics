# diagnostics-ant

Azure Portal Extensions Dashboard implemented in React using Ant Design.

This repository contains a small single-page app and a set of UI components to inspect information about extensions on the Azure portal.

## Features

- Small, focused React UI built with Vite and TypeScript
- Component-per-file pattern with companion `*.types.d.ts` files for props
- Zero-backend: static app intended to render diagnostics payloads

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

## Project layout

Top-level files

- `index.html` — Vite entry
- `vite.config.ts` — Vite configuration
- `package.json` — npm scripts and dependencies
- `tsconfig*.json` — TypeScript configurations

src/

- `main.tsx` — app bootstrap
- `App.tsx`, `ThemedApp.tsx` — top-level app components
- `*.tsx` — UI components (each with a matching `*.types.d.ts` for props)
- `utils.ts` — small shared helpers

public/

- static assets (favicon, etc.)

Tests

- Lightweight React tests with the project test setup. Run with:

```bash
npm test
```

## Conventions

- Components follow a one-file-per-component pattern with a companion `*.types.d.ts` for exported prop types.
- Keep visual and logic concerns co-located within the component file.
- Add unit tests for new behavior in `*.test.tsx` alongside components.

## Adding a new component

1. Create `src/MyComponent.tsx` and `src/MyComponent.types.d.ts`.
2. Export the component from `src/index` if you add a public API.
3. Add unit tests in `src/MyComponent.test.tsx`.

## Linting and formatting

- ESLint is configured via `eslint.config.ts`. Run:

```bash
npm run lint
```

Adjust or extend rules via `eslint.config.ts` as needed.
