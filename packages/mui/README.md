# diagnostics-mui

Azure Portal Extensions Dashboard implemented in React with Material UI

## Features

- React 19 + TypeScript
- Material UI (MUI) components and icons
- Vite dev server and production build
- Vitest unit tests with snapshots
- ESLint configuration and Prettier formatting

## Getting started

Prerequisites

- Node.js 22+ (or the LTS recommended for your environment)
- npm (or any npm-compatible client)

Install

Run from the repository root:

```bash
npm install
```

Development

Start the Vite dev server (with HMR):

```bash
npm run dev
```

Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Scripts reference

The following scripts are defined in `package.json`:

- `dev` — start Vite dev server
- `build` — run build steps (see `build:tsc` and `build:vite`)
- `build:tsc` — TypeScript build (tsc -b)
- `build:vite` — Vite production build
- `preview` — preview the production build
- `test` — run Vitest tests once
- `test:watch` — run Vitest in watch mode
- `test:coverage` — run tests and collect coverage
- `lint` — run ESLint
- `format` — run Prettier to format code

Testing

Unit tests are written with Vitest and React Testing Library. Run all tests with:

```bash
npm test
```

Update jest-like snapshots (Vitest):

```bash
npx vitest -u
```

Linting & Formatting

Lint the project with ESLint:

```bash
npm run lint
```

Format files with Prettier:

```bash
npm run format
```

Project structure

Important files and folders:

- `src/` — application source code
  - `.tsx` UI components (e.g. `BuildInfo.tsx`, `Extensions.tsx`)
  - `*.types.d.ts` — component prop types
  - `__tests__/` — unit tests and snapshots
- `index.html` — Vite entry HTML
- `vite.config.ts` — Vite configuration
- `package.json` — scripts and dependencies
- `tsconfig.*.json` — TypeScript configuration

Development conventions

- Components are functional React components written in TypeScript.
- Keep types colocated with components using `*.types.d.ts` files.
- Tests live alongside source in `src/__tests__` and use snapshots where helpful.
- Follow ESLint and Prettier rules enforced in the repo.

Acknowledgements

- Built with React, Vite, Material UI, and Vitest.
