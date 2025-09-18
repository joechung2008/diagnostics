import { describe, it, expect } from "vitest";
import { isExtensionInfo, byKey, toNavLink } from "../utils";

describe("utils", () => {
  describe("isExtensionInfo", () => {
    it("should return true for ExtensionInfo", () => {
      const extension: ExtensionInfo = { extensionName: "test" };
      expect(isExtensionInfo(extension)).toBe(true);
    });

    it("should return false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });

    it("should return false for ExtensionError", () => {
      const extension: ExtensionError = {
        lastError: { errorMessage: "error", time: "time" },
      };
      expect(isExtensionInfo(extension)).toBe(false);
    });
  });

  describe("byKey", () => {
    it("should return -1 if a.key < b.key", () => {
      const a: KeyedNavLink = { key: "a", name: "a" };
      const b: KeyedNavLink = { key: "b", name: "b" };
      expect(byKey(a, b)).toBe(-1);
    });

    it("should return 1 if a.key > b.key", () => {
      const a: KeyedNavLink = { key: "b", name: "b" };
      const b: KeyedNavLink = { key: "a", name: "a" };
      expect(byKey(a, b)).toBe(1);
    });

    it("should return 0 if a.key === b.key", () => {
      const a: KeyedNavLink = { key: "a", name: "a" };
      const b: KeyedNavLink = { key: "a", name: "a" };
      expect(byKey(a, b)).toBe(0);
    });
  });

  describe("toNavLink", () => {
    it("should return KeyedNavLink from ExtensionInfo", () => {
      const extension: ExtensionInfo = { extensionName: "test" };
      expect(toNavLink(extension)).toEqual({
        key: "test",
        name: "test",
        url: "",
      });
    });
  });
});
