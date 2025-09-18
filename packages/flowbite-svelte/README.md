# diagnostics-sv

Azure Portal Extensions Dashboard implemented in Svelte 5 with Flowbite Svelte

## Features

- List and inspect installed Azure Portal extension metadata
- Display build and server information (version, commit, stages)
- Responsive UI components built with Flowbite Svelte and Tailwind
- TypeScript for stronger guarantees and easier maintenance

## Tech stack

- Svelte 5
- TypeScript
- Vite
- Tailwind CSS
- Flowbite Svelte

## Getting started

Prerequisites

- Node.js 22+ and npm

Install

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

Useful scripts

- `npm run dev` — start Vite dev server
- `npm run build` — create production build
- `npm run preview` — locally preview production build
- `npm run check` — run type checks / svelte-check
- `npm run lint` — run ESLint + Prettier checks
- `npm run format` — run Prettier to format files

## Project structure

- `src/` — application source
  - `lib/components/` — Svelte components (BuildInfo, Extension, ServerInfo, etc.)
  - `routes/` — SvelteKit routes (`+layout.svelte`, `+page.svelte`)
  - `app.css` — global styles
- `static/` — static assets served at the project root
- `static/` — static assets served at the project root
- `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json` — build & tooling configs

## Development notes

- Components use `<script lang="ts">` and colocated type definitions in `src/lib/*.types.d.ts`.
- Styling is done with Tailwind; component-specific styles may be included in each Svelte file.
- There is no global state library by default — Svelte reactivity and props are used. If you need app-wide state, prefer Svelte stores.

## Testing

Testing information and conventions are in `TESTING.md`. See that file for how tests are organized, mocking patterns, and run commands.
