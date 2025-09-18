# diagnostics-mantine

Azure Portal Extensions Dashboard implemented in React with Mantine

Key goals:

- Provide a compact dashboard to view and manage extension metadata.
- Use Mantine for consistent, accessible UI primitives and theming.
- Ship fast local development with Vite and a simple build pipeline.

## Built with

- React + TypeScript
- Mantine (UI components + hooks)
- Vite (dev server & build)
- Vitest + @testing-library (unit & component tests)

## Getting started

Prerequisites: Node.js (LTS recommended) and npm.

Install dependencies:

```pwsh
npm install
```

Start the dev server:

```pwsh
npm run dev
```

Open http://localhost:5173 (or the address Vite prints) to view the app.

Build for production:

```pwsh
npm run build
```

Preview the production build locally:

```pwsh
npm run preview
```

## Scripts

Available npm scripts (see `package.json`):

- `npm run dev` — Start Vite dev server
- `npm run build` — Run the build pipeline (`tsc` + `vite build`)
- `npm run preview` — Preview the production build
- `npm run test` — Run unit tests (Vitest)
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Run tests with coverage
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier to format files

## Project structure

High-level files and folders:

- `src/` — Application source code
  - `App.tsx` — Root app component
  - `index.tsx` — App entry and client bootstrap
  - `Extensions.tsx`, `Extension.tsx` — Extension list and detail views
  - `ServerInfo.tsx`, `BuildInfo.tsx`, `Configuration.tsx` — small info panels
  - `utils.ts` — helper utilities and lightweight adapters
- `public/` — Static assets
- `__tests__/` — Component and unit tests

## Testing

Run the test suite with:

```pwsh
npm run test
```

For interactive development run tests in watch mode:

```pwsh
npm run test:watch
```

Please run `npm run lint` and `npm run format` before submitting changes.

## Notes

- This project intentionally keeps the UI and state management minimal; it is intended as a small admin/dashboard reference using Mantine.
- If you add environment-specific configuration, document required variables in a `.env.example` file and do not commit secrets.
