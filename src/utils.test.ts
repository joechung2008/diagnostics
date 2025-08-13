import { describe, expect, it } from "vitest";
import { byKey, isExtensionInfo, toNavLink, when } from "./utils";

describe("isExtensionInfo", () => {
  it("returns true for ExtensionInfo", () => {
    expect(isExtensionInfo({ extensionName: "foo" })).toBe(true);
  });
  it("returns false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
  it("returns false for object without extensionName", () => {
    expect(isExtensionInfo({} as Extension)).toBe(false);
  });
});

describe("byKey", () => {
  it("sorts by key ascending", () => {
    const a: KeyedNavLink = { key: "a", name: "A", url: "" };
    const b: KeyedNavLink = { key: "b", name: "B", url: "" };
    expect(byKey(a, b)).toBeLessThan(0);
    expect(byKey(b, a)).toBeGreaterThan(0);
    expect(byKey(a, a)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("creates a KeyedNavLink from ExtensionInfo", () => {
    expect(toNavLink({ extensionName: "foo" })).toEqual({
      key: "foo",
      name: "foo",
      url: "",
    });
  });
});

describe("when", () => {
  it("returns args when condition is true", () => {
    expect(when(true, 1, 2, 3)).toEqual([1, 2, 3]);
  });
  it("returns empty array when condition is false", () => {
    expect(when(false, 1, 2, 3)).toEqual([]);
  });
});
