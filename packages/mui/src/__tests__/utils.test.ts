import { describe, expect, it } from "vitest";
import { byKey, isExtensionInfo, toNavLink, when } from "../utils";

describe("isExtensionInfo", () => {
  const info: ExtensionInfo = { extensionName: "ext1" };
  const error: ExtensionError = {
    lastError: { errorMessage: "fail", time: "now" },
  };

  it("returns true for ExtensionInfo", () => {
    expect(isExtensionInfo(info)).toBe(true);
  });

  it("returns false for ExtensionError", () => {
    expect(isExtensionInfo(error as Extension)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
});

describe("byKey", () => {
  const a: KeyedNavLink = { key: "a", name: "A", url: "" };
  const b: KeyedNavLink = { key: "b", name: "B", url: "" };

  it("returns -1 if a.key < b.key", () => {
    expect(byKey(a, b)).toBe(-1);
  });

  it("returns 1 if a.key > b.key", () => {
    expect(byKey(b, a)).toBe(1);
  });

  it("returns 0 if a.key === b.key", () => {
    expect(byKey(a, { ...a })).toBe(0);
  });
});

describe("toNavLink", () => {
  it("converts ExtensionInfo to KeyedNavLink", () => {
    const info: ExtensionInfo = { extensionName: "ext2" };
    expect(toNavLink(info)).toEqual({
      key: "ext2",
      name: "ext2",
      url: "",
    });
  });
});

describe("when", () => {
  it("returns args if condition is true", () => {
    expect(when(true, 1, 2, 3)).toEqual([1, 2, 3]);
  });

  it("returns empty array if condition is false", () => {
    expect(when(false, 1, 2, 3)).toEqual([]);
  });

  it("works with no args", () => {
    expect(when(true)).toEqual([]);
    expect(when(false)).toEqual([]);
  });
});
