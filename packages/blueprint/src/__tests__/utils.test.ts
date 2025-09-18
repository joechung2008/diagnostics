import { describe, expect, it } from "vitest";
import { byKey, isExtensionInfo, toNavLink } from "../utils";

describe("isExtensionInfo", () => {
  it("returns true for ExtensionInfo", () => {
    expect(isExtensionInfo({ extensionName: "ext" })).toBe(true);
  });

  it("returns false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
});

describe("byKey", () => {
  it("sorts by key", () => {
    const a = { name: "a", key: "a" };
    const b = { name: "b", key: "b" };
    expect(byKey(a, b)).toBeLessThan(0);
    expect(byKey(b, a)).toBeGreaterThan(0);
    expect(byKey(a, a)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("creates a nav link from ExtensionInfo", () => {
    const info = { extensionName: "ext" };
    const navLink = toNavLink(info);
    expect(navLink).toEqual({ key: "ext", name: "ext", url: "" });
  });
});
