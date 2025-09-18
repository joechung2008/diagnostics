# diagnostics-bootstrap

Azure Portal Extensions Dashboard implemented in React using React Bootstrap

## Features

- Small, focused React UI built with Vite and TypeScript
- Component-per-file pattern with companion `*.types.d.ts` files for props
- Zero-backend: static app intended to render diagnostics payloads or JSON fixtures
- Lightweight unit tests included for core components

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

## Project layout

Top-level files

- `index.html` — Vite entry
- `vite.config.ts` — Vite configuration
- `package.json` — npm scripts and dependencies
- `tsconfig*.json` — TypeScript configurations

`src/`

- `main.tsx` — app bootstrap and mount
- `App.tsx` — top-level app component
- `*.tsx` — UI components (each with a matching `*.types.d.ts` for props)
- `utils.ts` — small shared helpers
- `__tests__/` — unit tests and snapshots

`public/`

- static assets (favicon, etc.)

## Conventions

- Components follow a one-file-per-component pattern with a companion `*.types.d.ts` for exported prop types.
- Keep visual and logic concerns co-located within the component file for small, testable units.
- Add unit tests for new behavior in `*.test.tsx` alongside components.

## Linting and formatting

- ESLint is configured via `eslint.config.ts`. Run:

```bash
npm run lint
```

Adjust or extend rules via `eslint.config.ts` as needed.

## Development notes

- The app is intentionally framework-agnostic for data: it reads JSON payloads and renders UI. Use `utils.ts` helpers for parsing fixture data.
- Tests are lightweight and use the project's existing React testing setup. Keep tests small and focused on behavior.
