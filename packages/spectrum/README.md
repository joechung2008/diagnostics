# diagnostics-spectrum

Azure Portal Extensions Dashboard implemented in React 19 with Adobe Spectrum

## Features

- Small, focused React UI built with Vite and TypeScript
- Component-per-file pattern with companion `*.types.d.ts` files for props
- Zero-backend: static app intended to render diagnostics payloads for Azure Portal extensions
- Built using Adobe Spectrum components and styling

## Getting started

Prerequisites

- Node.js 22+ (LTS recommended)
- npm (or a compatible client)

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

src/

- `index.tsx` — app bootstrap
- `App.tsx` — top-level app component
- `*.tsx` — UI components (each with a matching `*.types.d.ts` for props)
- `utils.ts` — small shared helpers
- `public/` — static assets (favicon, robots.txt, etc.)

Tests

- Lightweight React tests with the project test setup. Run with `npm test`.

## Conventions

- Components follow a one-file-per-component pattern with a companion `*.types.d.ts` for exported prop types.
- Keep visual and logic concerns co-located within the component file for small reusable components.
- Add unit tests for new behavior in `*.test.tsx` alongside components.

## Linting and formatting

- ESLint is configured via `eslint.config.ts`. Run:

```bash
npm run lint
```

Adjust or extend rules via `eslint.config.ts` as needed.
