import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSystemTheme } from "../useSystemTheme";

let mockPrefersDark = false;
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: () => mockPrefersDark,
  };
});

describe("useSystemTheme", () => {
  afterEach(() => {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  });

  it("returns dark theme and sets body styles when prefers dark mode", () => {
    mockPrefersDark = true;
    const { result } = renderHook(() => useSystemTheme());

    expect(result.current.palette.mode).toBe("dark");
    const computedBg = getComputedStyle(document.body).backgroundColor;
    expect(computedBg).toBe("rgb(18, 18, 18)");
    const computedColor = getComputedStyle(document.body).color;
    expect(computedColor).toBe("rgb(255, 255, 255)");
  });

  it("returns light theme and sets body styles when prefers light mode", () => {
    mockPrefersDark = false;
    const { result } = renderHook(() => useSystemTheme());

    expect(result.current.palette.mode).toBe("light");
    const computedBg = getComputedStyle(document.body).backgroundColor;
    expect(computedBg).toBe("rgb(255, 255, 255)");
    const computedColor = getComputedStyle(document.body).color;
    expect(computedColor).toBe("rgba(0, 0, 0, 0.87)");
  });
});
