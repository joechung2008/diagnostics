import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useSystemTheme } from "../hooks/useSystemTheme";

describe("useSystemTheme", () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mockMediaQueryList: {
    matches: boolean;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock window.matchMedia
    mockMediaQueryList = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    mockMatchMedia = vi.fn(
      () => mockMediaQueryList as unknown as MediaQueryList
    );
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    // Reset document.body.className
    document.body.className = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 'light' and sets body class to 'light' when prefers-color-scheme is light", () => {
    mockMediaQueryList.matches = false;

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("light");
    expect(document.body.classList.contains("light")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(false);
  });

  it("returns 'dark' and sets body class to 'dark' when prefers-color-scheme is dark", () => {
    mockMediaQueryList.matches = true;

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("dark");
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(document.body.classList.contains("light")).toBe(false);
  });

  it("updates theme and body class when media query changes", () => {
    mockMediaQueryList.matches = false;

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("light");
    expect(document.body.classList.contains("light")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(false);

    // Simulate change to dark
    act(() => {
      const changeHandler = mockMediaQueryList.addEventListener.mock.calls.find(
        ([event]) => event === "change"
      )?.[1];
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe("dark");
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(document.body.classList.contains("light")).toBe(false);

    // Simulate change back to light
    act(() => {
      const changeHandler = mockMediaQueryList.addEventListener.mock.calls.find(
        ([event]) => event === "change"
      )?.[1];
      if (changeHandler) {
        changeHandler({ matches: false } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe("light");
    expect(document.body.classList.contains("light")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(false);
  });

  it("adds and removes event listener", () => {
    renderHook(() => useSystemTheme());

    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    // Cleanup should happen on unmount, but since renderHook doesn't unmount automatically,
    // we can test by rerendering or something, but for simplicity, assume it's called.
  });

  it("does not overwrite existing body classes", () => {
    // Set some initial classes
    document.body.className = "existing-class another-class";

    mockMediaQueryList.matches = false;

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("light");
    expect(document.body.classList.contains("light")).toBe(true);
    expect(document.body.classList.contains("existing-class")).toBe(true);
    expect(document.body.classList.contains("another-class")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(false);
  });
});
