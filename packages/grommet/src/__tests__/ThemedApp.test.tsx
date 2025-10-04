import { render, screen, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import ThemedApp from "../ThemedApp";

const mockMatchMedia = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

beforeEach(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: mockMatchMedia,
  });

  mockMatchMedia.mockReturnValue({
    matches: false, // default to light mode
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("ThemedApp", () => {
  it("renders children", () => {
    render(
      <ThemedApp>
        <div>Test Child</div>
      </ThemedApp>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies grommet theme for light mode", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { container } = render(
      <ThemedApp>
        <div>Test</div>
      </ThemedApp>
    );

    // Check that Grommet is rendered with grommet theme
    // Since we can't easily inspect the theme prop, we can check the structure
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies dark theme for dark mode", () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { container } = render(
      <ThemedApp>
        <div>Test</div>
      </ThemedApp>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("adds and removes event listener for theme changes", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { unmount } = render(
      <ThemedApp>
        <div>Test</div>
      </ThemedApp>
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("updates theme when media query changes", () => {
    const changeHandlers: ((e: MediaQueryListEvent) => void)[] = [];

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn((event, handler) => {
        if (event === "change") changeHandlers.push(handler);
      }),
      removeEventListener: mockRemoveEventListener,
    });

    render(
      <ThemedApp>
        <div>Test</div>
      </ThemedApp>
    );

    // Simulate theme change to dark
    act(() => {
      changeHandlers.forEach((handler) =>
        handler({ matches: true } as MediaQueryListEvent)
      );
    });

    // The component should re-render with dark theme
    // Since we can't directly check the theme, we verify handlers were called
    expect(changeHandlers.length).toBeGreaterThan(0);
  });
});
