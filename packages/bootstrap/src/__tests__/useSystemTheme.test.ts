import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useSystemTheme } from "../useSystemTheme";

// Mock matchMedia for theme detection
const mockMatchMedia = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

vi.stubGlobal("matchMedia", mockMatchMedia);

describe("useSystemTheme", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document.documentElement
    document.documentElement.removeAttribute("data-bs-theme");
  });

  it("should set light theme when prefers-color-scheme is light", () => {
    mockMatchMedia.mockReturnValue({
      matches: false, // light theme
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should set dark theme when prefers-color-scheme is dark", () => {
    mockMatchMedia.mockReturnValue({
      matches: true, // dark theme
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("dark");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should update theme when media query changes", () => {
    let changeCallback: (event: MediaQueryListEvent) => void;

    mockMatchMedia.mockReturnValue({
      matches: false, // initially light
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn().mockImplementation((event, callback) => {
        if (event === "change") {
          changeCallback = callback;
        }
      }),
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useSystemTheme());

    expect(result.current).toBe("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );

    // Simulate theme change to dark
    act(() => {
      changeCallback!({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe("dark");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  });

  it("should clean up event listener on unmount", () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: vi.fn(),
    });

    const { unmount } = renderHook(() => useSystemTheme());

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
});
