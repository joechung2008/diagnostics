import { describe, it, expect } from "vitest";
import { isExtensionInfo, byKey, toNavLink } from "../utils";

describe("isExtensionInfo", () => {
  it("returns true for ExtensionInfo", () => {
    const ext: ExtensionInfo = { extensionName: "Test" };
    expect(isExtensionInfo(ext)).toBe(true);
  });

  it("returns false for ExtensionError", () => {
    const ext: ExtensionError = {
      lastError: { errorMessage: "err", time: "now" },
    };
    expect(isExtensionInfo(ext)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
});

describe("byKey", () => {
  it("sorts KeyedNavLink by key", () => {
    const a: KeyedNavLink = { key: "a", name: "A" };
    const b: KeyedNavLink = { key: "b", name: "B" };
    expect(byKey(a, b)).toBeLessThan(0);
    expect(byKey(b, a)).toBeGreaterThan(0);
    expect(byKey(a, a)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("creates KeyedNavLink from ExtensionInfo", () => {
    const ext: ExtensionInfo = { extensionName: "Test" };
    const navLink = toNavLink(ext);
    expect(navLink).toEqual({ key: "Test", name: "Test", url: "" });
  });
});
