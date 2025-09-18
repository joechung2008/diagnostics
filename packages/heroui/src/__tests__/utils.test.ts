import { describe, it, expect } from "vitest";
import { isExtensionInfo, byKey, toNavLink } from "../utils";

describe("isExtensionInfo", () => {
  it("should return true for valid ExtensionInfo", () => {
    const obj = { extensionName: "test", version: "1.0.0" };
    expect(isExtensionInfo(obj)).toBe(true);
  });

  it("should return false for invalid ExtensionInfo", () => {
    expect(isExtensionInfo({} as unknown as Extension)).toBe(false);
    expect(isExtensionInfo(undefined as unknown as Extension)).toBe(false);
    expect(
      isExtensionInfo({
        lastError: {
          errorMessage: "error",
          time: "now",
        },
      } as unknown as Extension)
    ).toBe(false);
  });
});

describe("byKey", () => {
  it("should compare two KeyedNavLink objects by key", () => {
    const a = { key: "a", name: "A" };
    const b = { key: "b", name: "B" };
    expect(byKey(a, b)).toBeLessThan(0);
    expect(byKey(b, a)).toBeGreaterThan(0);
    expect(byKey(a, a)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("should convert ExtensionInfo to KeyedNavLink", () => {
    const ext = { extensionName: "foo" };
    const navLink = toNavLink(ext);
    expect(navLink).toHaveProperty("key", "foo");
  });
});
