# diagnostics-chakra

Azure Portal Extensions Dashboard implemented in React using Chakra UI

## Features

- Built with React 19 and Chakra UI for accessible, themeable components
- Fast bundling with Vite and TypeScript support
- Local development server with hot module replacement
- Unit tests with Vitest and DOM testing utilities
- Linting and formatting presets for a consistent code style

## Quick start

Requirements

- Node.js >= 22
- npm

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

Run tests

```bash
npm run test
```

Generate test coverage

```bash
npm run test:coverage
```

Format and lint

```bash
npm run format
npm run lint
```

## NPM scripts

- `dev` - start Vite dev server
- `build` - run TypeScript build and Vite production build
- `build:tsc` - TypeScript project build (tsc -b)
- `build:vite` - Vite production bundle
- `preview` - preview the production bundle locally
- `test` - run Vitest tests once
- `test:watch` - run Vitest in watch mode
- `test:coverage` - run tests and collect coverage
- `format` - run Prettier to format files
- `lint` - run ESLint across the codebase

These scripts are defined in `package.json`.

## Project structure

- `src/` - application source files
  - `components/` - shared UI components (see `components/ui/ColorMode.tsx`)
  - `hooks/` - custom React hooks (e.g. `useColorMode.ts`)
  - `__tests__/` - unit and integration tests run by Vitest
  - `index.tsx` - app entry point
- `public/` - static assets served by the dev server
- `vite.config.ts`, `tsconfig.json` - build and TypeScript configs

## Development notes

- The app uses Chakra UI for theming and color-mode support; the color mode toggle lives in `src/components/ui/ColorMode.tsx`.
- Type definitions are provided in `src/types.d.ts`.
- Tests use `@testing-library/react` and run with Vitest.
- The project targets modern browsers via Vite; adjust `tsconfig.json` and `vite.config.ts` if you need different targets.

## Acknowledgements

- Built with React, Chakra UI, Vite and Vitest.
