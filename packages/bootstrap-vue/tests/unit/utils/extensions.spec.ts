import { describe, expect, it } from "vitest";
import type { ExtensionError, ExtensionInfo } from "../../../app/types/Extension";
import type { KeyedNavLink } from "../../../app/types/ExtensionsProps";
import { byKey, isExtensionInfo, toNavLink, when } from "../../../app/utils/extensions";

describe("extensions", () => {
  describe("isExtensionInfo", () => {
    it("should return true for ExtensionInfo objects", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension"
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it("should return false for ExtensionError objects", () => {
      const extensionError: ExtensionError = {
        lastError: {
          errorMessage: "Test error",
          time: "2023-01-01T00:00:00Z"
        }
      };

      expect(isExtensionInfo(extensionError)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe("byKey", () => {
    it("should return -1 when first key is less than second", () => {
      const a: KeyedNavLink = { key: "a", name: "A", url: "" };
      const b: KeyedNavLink = { key: "b", name: "B", url: "" };

      expect(byKey(a, b)).toBe(-1);
    });

    it("should return 1 when first key is greater than second", () => {
      const a: KeyedNavLink = { key: "b", name: "B", url: "" };
      const b: KeyedNavLink = { key: "a", name: "A", url: "" };

      expect(byKey(a, b)).toBe(1);
    });

    it("should return 0 when keys are equal", () => {
      const a: KeyedNavLink = { key: "a", name: "A", url: "" };
      const b: KeyedNavLink = { key: "a", name: "A", url: "" };

      expect(byKey(a, b)).toBe(0);
    });
  });

  describe("toNavLink", () => {
    it("should convert ExtensionInfo to KeyedNavLink", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
        config: { key: "value" }
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: "test-extension",
        name: "test-extension",
        url: ""
      });
    });

    it("should handle extension with just extensionName", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "simple-extension"
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: "simple-extension",
        name: "simple-extension",
        url: ""
      });
    });
  });

  describe("when", () => {
    it("should return args when condition is true", () => {
      expect(when(true, 1, 2, 3)).toEqual([1, 2, 3]);
      expect(when(true, "a", "b")).toEqual(["a", "b"]);
    });

    it("should return empty array when condition is false", () => {
      expect(when(false, 1, 2, 3)).toEqual([]);
      expect(when(false, "a", "b")).toEqual([]);
    });
  });
});
