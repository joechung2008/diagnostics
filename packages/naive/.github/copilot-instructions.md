# Guidelines for AI coding assistants like GitHub Copilot

## General

- Be brief and concise when responding.
- Focus on the code and avoid unnecessary explanations.
- When suggesting code, ensure it is relevant to the inquiry.

## Vue/Nuxt

- Do not import implicitly available modules, e.g., `computed`.

### Project conventions (this repo)

- Nuxt 4 (app directory layout): prefer composables and the Nuxt app directory layout under `app/`.
- Use TypeScript types from `app/types/` for component prop shapes and shared models.
- UI is built with Naive UI via the `nuxtjs-naive-ui` integration. Prefer Naive components for new UI unless a plain HTML element is simpler.

### Imports & runtime

- Nuxt provides many globals (e.g., `useFetch`, `useState`, `useRuntimeConfig`, `useRouter`, `useRoute`, `useNuxtApp`). Do not import these from 'vue' or other packages.
- Keep server-only code (APIs, file system access) under server handlers or `server/` where appropriate.

### Vite / Build

- Respect `package.json` scripts: `dev`, `build`, `preview`, `typecheck`, `format`, `lint`, `test`.
- Prefer dev-time fast feedback: use `npm run dev` for local iteration and `npm run typecheck` when adding types.

### Testing

- Tests use Vitest + Vue Test Utils. Place component/unit tests under `tests/` and follow existing patterns.
- Use `happy-dom` or `jsdom` as the test environment as configured in the repo.

### Helpful checks before suggesting changes

1. Scan `package.json` for scripts and major dependencies.
2. Look in `app/components/`, `app/types/`, and `utils/` to find related code and types.
3. Run tests locally (`npm test`) after edits when possible.

### Error handling & PR notes

- If a change needs a build or environment that can't be run here, explain why and provide exact commands the maintainer should run locally.

```

```
