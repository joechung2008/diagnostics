import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { render as testingLibraryRender } from "@testing-library/react";

export function render(ui: React.ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Provider theme={defaultTheme}>{children as any}</Provider>
    ),
  });
}
