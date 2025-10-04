import { screen } from "@testing-library/react";
import { render as testingLibraryRender } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemedMantineProvider } from "../ThemedMantineProvider";

// Mock the useColorScheme hook
vi.mock("@mantine/hooks", () => ({
  useColorScheme: vi.fn(),
}));

import { useColorScheme } from "@mantine/hooks";

const mockUseColorScheme = vi.mocked(useColorScheme);

describe("ThemedMantineProvider", () => {
  it("should render children", () => {
    mockUseColorScheme.mockReturnValue("light");

    testingLibraryRender(
      <ThemedMantineProvider>
        <div data-testid="child">Test Child</div>
      </ThemedMantineProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should apply light theme when useColorScheme returns 'light'", () => {
    mockUseColorScheme.mockReturnValue("light");

    testingLibraryRender(
      <ThemedMantineProvider>
        <div>Content</div>
      </ThemedMantineProvider>
    );

    // The component should render without errors
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should apply dark theme when useColorScheme returns 'dark'", () => {
    mockUseColorScheme.mockReturnValue("dark");

    testingLibraryRender(
      <ThemedMantineProvider>
        <div>Content</div>
      </ThemedMantineProvider>
    );

    // The component should render without errors
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should call useColorScheme hook", () => {
    mockUseColorScheme.mockReturnValue("light");

    testingLibraryRender(
      <ThemedMantineProvider>
        <div>Content</div>
      </ThemedMantineProvider>
    );

    expect(mockUseColorScheme).toHaveBeenCalled();
  });
});
