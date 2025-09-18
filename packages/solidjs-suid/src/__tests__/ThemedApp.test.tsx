import { render } from "solid-js/web";
import { screen } from "@testing-library/dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ThemedApp from "../ThemedApp";

vi.mock("../App", () => ({
  default: () => <div data-testid="app" />,
}));

describe("ThemedApp", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("renders ThemeProvider with correct mode and sets background color", () => {
    // Mock matchMedia for light mode
    window.matchMedia = vi.fn().mockImplementation(
      (): MediaQueryList => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        media: "",
        onchange: null,
        dispatchEvent: vi.fn(),
      })
    );

    render(() => <ThemedApp />, document.body);

    const appDiv = screen.getByTestId("app");
    expect(appDiv).toBeTruthy();

    expect(document.body.style.backgroundColor).toBe("rgb(255, 255, 255)");
  });

  it("updates mode on system preference change and updates background color", () => {
    let handler: ((e: MediaQueryListEvent) => void) | undefined;

    window.matchMedia = vi.fn().mockImplementation(
      (): MediaQueryList => ({
        matches: false,
        addEventListener: (
          _: unknown,
          fn: (e: MediaQueryListEvent) => void
        ) => {
          handler = fn;
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        media: "",
        onchange: null,
        dispatchEvent: vi.fn(),
      })
    );

    render(() => <ThemedApp />, document.body);
    expect(screen.getByTestId("app")).toBeTruthy();

    handler?.({ matches: true } as MediaQueryListEvent);

    expect(document.body.style.backgroundColor).toBe("rgb(18, 18, 18)");
    expect(screen.getByTestId("app")).toBeTruthy();
  });
});
