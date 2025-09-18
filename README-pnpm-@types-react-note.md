PNPM / @types/react note

Some packages target React 18 and others React 19. pnpm may install multiple `@types/react` majors which breaks TypeScript composite builds (JSX type errors).

Quick fixes:

- Package-local pin: add a suitable `@types/react` to the package that targets React 19 (example: `@types/react@19.1.12`).
- Local type shim: add `src/types/*.d.ts` in a package to declare problematic modules (e.g. `@remixicon/react`) as `React.ComponentType`.

Tell me if you want this pasted into `README.md`.
