import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSystemTheme } from "../useSystemTheme";

describe("useSystemTheme", () => {
  it("should return a theme string", () => {
    const { result } = renderHook(() => useSystemTheme());
    expect(typeof result.current).toBe("string");
  });
});
