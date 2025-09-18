# Testing Guide

This project uses Vitest + @testing-library/svelte for unit and component tests. Tests are colocated with source files under `src/`.

## Quick commands

- Install deps: `npm install`
- Run tests: `npm run test`
- Run tests + coverage: `npm run test:coverage`
- Run single test file: `npx vitest run path/to/file.spec.ts`

## Where tests live

- All tests are under `src/` alongside the component or route they test.
- Vitest is configured to include `src/**/*.{test,spec}.{ts,js,svelte}`. The legacy `tests/` folder is no longer used by the test runner.

## Module aliasing

- `@` resolves to the `src/` folder via SvelteKit alias in `svelte.config.js`.
- We intentionally removed `paths` from `tsconfig.json` to avoid SvelteKit/toolchain warnings. Do not add duplicate path aliases to `tsconfig.json` unless you know the consequences.

## Test setup

- `src/setup.ts` is loaded by Vitest (`vite.config.ts` test.setupFiles).
- Common DOM shims (e.g., `matchMedia`) and global test helpers live here.

## Mocking patterns

### Keep real utils, mock network fetch

We hoist a fetch mock and replace `fetchDiagnostics` in `@/lib/utils` in tests:

```ts
const testMocks = vi.hoisted(() => ({
  fetchDiagnosticsMock: vi.fn()
}));

vi.mock("$lib/utils", async () => {
  const actual = await vi.importActual("$lib/utils");
  return { ...actual, fetchDiagnostics: testMocks.fetchDiagnosticsMock };
});
```

### Deterministic svelte-query mock (recommended)

To avoid async races, tests use a small, controllable store pattern:

```ts
type QueryMockState<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

let queryMockValue: QueryMockState<Diagnostics> = {
  data: undefined,
  isLoading: false,
  error: undefined,
  refetch: () => {}
};

function mockQueryStore<T>(getValue: () => QueryMockState<T>) {
  return {
    subscribe(run: (val: QueryMockState<T>) => void) {
      run(getValue());
      return () => {};
    }
  };
}

vi.mock("@tanstack/svelte-query", () => ({
  createQuery: () => mockQueryStore(() => queryMockValue)
}));
```

- Tests can mutate `queryMockValue` per-case (e.g., set `queryMockValue.data = ...` or `queryMockValue.refetch = vi.fn()`).

### Flowbite & DOM library stubs

Flowbite uses Popper/matchMedia which can cause runtime errors in jsdom. Tests use lightweight DOM-returning stubs for components used by `+page.svelte`:

```ts
vi.mock("flowbite-svelte", async () => {
  const actual = await vi.importActual("flowbite-svelte");
  const makeContainer =
    (tag = "div") =>
    (props = {}) => {
      const el = document.createElement(tag);
      if (props.onclick) el.addEventListener("click", props.onclick);
      return el;
    };

  return {
    ...actual,
    Dropdown: makeContainer("div"),
    DropdownItem: (props = {}) => {
      const btn = document.createElement("button");
      btn.textContent = String(props.text ?? props.children ?? "");
      if (props.onclick) btn.addEventListener("click", props.onclick);
      return btn;
    },
    Tabs: makeContainer("div"),
    TabItem: makeContainer("button"),
    NavLi: makeContainer("li"),
    NavUl: makeContainer("ul"),
    Navbar: makeContainer("nav"),
    DarkMode: makeContainer("div")
  };
});
```

Adjust stubs if your tests need specific props/children behavior.

## Writing tests: tips

- If labels appear in multiple DOM nodes (nav + sidebar), use `findAllByText` and pick the intended occurrence (e.g., last for sidebar).
- Use the `queryMockValue` pattern to inject state (loading, data, error) deterministically.
- For interactions that call `$query.refetch()`, set `queryMockValue.refetch = vi.fn()` and assert it was called.
- Keep tests small and focused: one behavior per test.

## Coverage

- We use v8 coverage via Vitest (`npm run test:coverage`).
- Coverage report is emitted to `coverage/`.

## Troubleshooting

- If tests throw Popper-related errors, ensure Flowbite is stubbed (see above).
- If TypeScript linting flags `any` in dynamic test mocks, add file-level eslint disable comments sparingly:
  - `/* eslint-disable @typescript-eslint/no-explicit-any */`
