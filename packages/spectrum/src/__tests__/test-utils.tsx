import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { render as testingLibraryRender } from "@testing-library/react";

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider theme={defaultTheme}>{children}</Provider>
    ),
  });
}
