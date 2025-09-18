import { describe, expect, it } from "vitest";
import { byKey, isExtensionInfo, toNavLink, when } from "./utils";

describe("utils", () => {
  describe("isExtensionInfo", () => {
    it("returns true for ExtensionInfo objects", () => {
      const obj: ExtensionInfo = { extensionName: "ext" };
      expect(isExtensionInfo(obj)).toBe(true);
    });

    it("returns false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });

    it("returns false for null", () => {
      expect(isExtensionInfo(null as unknown as ExtensionInfo)).toBe(false);
    });

    it("returns false for objects without extensionName", () => {
      expect(isExtensionInfo({} as unknown as ExtensionInfo)).toBe(false);
    });
  });

  describe("byKey", () => {
    it("sorts by key", () => {
      const a: KeyedNavLink = { key: "a", name: "A", url: "" };
      const b: KeyedNavLink = { key: "b", name: "B", url: "" };
      expect(byKey(a, b)).toBe(-1);
      expect(byKey(b, a)).toBe(1);
      expect(byKey(a, a)).toBe(0);
    });
  });

  describe("toNavLink", () => {
    it("creates a KeyedNavLink from ExtensionInfo", () => {
      const info: ExtensionInfo = { extensionName: "ext" };
      expect(toNavLink(info)).toEqual({
        key: "ext",
        name: "ext",
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
  });
});
