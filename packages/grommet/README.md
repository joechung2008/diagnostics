# diagnostics-grommet

Azure Portal Extensions Dashboard implemented in React with Grommet

## Features

- React 19 + Grommet-based responsive UI
- Fast development with Vite
- Unit tests with Vitest and React Testing Library
- ESLint + Prettier for consistent code quality

## Quickstart

Prerequisites

- Node.js (recommended 22+)
- npm (bundled with Node.js)

Local development

1. Install dependencies

   npm install

2. Start the dev server

   npm run dev

3. Open your browser at http://localhost:5173

Build and preview

1. Build the production bundle

   npm run build

2. Preview the production build locally

   npm run preview

## Scripts

The following npm scripts are available (defined in `package.json`):

- `npm run dev` — Start Vite dev server
- `npm run build` — Run all build steps (`build:tsc` + `build:vite`)
- `npm run build:tsc` — TypeScript build (tsc -b)
- `npm run build:vite` — Vite production build
- `npm run preview` — Preview the built app locally
- `npm run test` — Run tests once with Vitest
- `npm run test:watch` — Run Vitest in watch mode
- `npm run test:coverage` — Run tests with coverage
- `npm run lint` — Run ESLint across the project
- `npm run format` — Run Prettier to format the codebase

## Testing

Unit tests are implemented with Vitest and React Testing Library. Run the test suite with:

    npm run test

Run coverage report:

    npm run test:coverage

## Development notes

- TypeScript project configuration is available in `tsconfig.json` and `tsconfig.app.json`.
- Vite configuration is in `vite.config.ts`.
- Component entry point: `src/App.tsx`.
- Tests live in `src/__tests__/` and snapshots in `src/__tests__/__snapshots__/`.

Coding style

- This project uses ESLint and Prettier. Run `npm run lint` and `npm run format` before committing changes.

## Acknowledgements

- Grommet (UI)
- Vite
- Vitest and Testing Library
