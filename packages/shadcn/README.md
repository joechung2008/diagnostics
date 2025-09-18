# diagnostics-shadcn

Azure Portal Extensions Dashboard implemented in React with shadcn/ui

## Features

- React + TypeScript + Vite (fast dev server and build)
- Tailwind CSS for styling
- shadcn/ui + Radix primitives for accessible UI components
- Lightweight extension model (see `src/Extensions.tsx` and `src/lib/utils.ts`)
- Vitest + Testing Library unit tests with snapshots

## Repository layout

- `index.html` — Vite entry HTML
- `src/`
  - `index.tsx` — app bootstrap
  - `App.tsx` — main application, environment selection, routing
  - `Extensions.tsx`, `Extension.tsx` — extension list and detail UI
  - `components/ui/` — shadcn-style UI primitives used by the app
  - `lib/utils.ts` — small helpers and type guards
  - `__tests__/` — unit tests and snapshots
- `vite.config.ts`, `tsconfig.json`, `package.json` — build & tooling

## Getting started

Prerequisites: Node.js (LTS recommended) and npm.

1. Install dependencies

```bash
npm ci
```

2. Development server (Vite)

```bash
npm run dev
```

Then open http://localhost:5173 in your browser (Vite will print the exact URL).

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

5. Run tests

```bash
npm run test
```

6. Lint / format

```bash
npm run lint
npm run format
```

## How the app is organized

- Environment switching: `App.tsx` contains a small environment selector (Public / Fairfax / Mooncake) and resets app state when switching environments.
- Extensions: Extensions are plain objects consumed and rendered by `Extensions.tsx`. Helpers such as `isExtensionInfo` and `toNavLink` live in `src/lib/utils.ts`.
- UI primitives: The `components/ui/` folder contains local shadcn-style wrappers (buttons, tabs, menus) that the app composes.

## Tests

Unit tests are written with Vitest and React Testing Library. Run the full suite with:

```bash
npm run test
```

There are snapshots under `src/__tests__/__snapshots__/` to validate UI rendering.

## Notes

- This project is intentionally small and is meant as a demo / playground for the shadcn/ui + Radix + Tailwind stack.
- No backend is included — the app expects client-side data or example JSON bundled in the source.

## Acknowledgements

Built with Vite, React, Tailwind CSS, Radix UI and the shadcn/ui patterns.
