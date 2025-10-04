import { render as testingLibraryRender } from "@testing-library/react";
import { ThemedMantineProvider } from "../ThemedMantineProvider";

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ThemedMantineProvider>{children}</ThemedMantineProvider>
    ),
  });
}
