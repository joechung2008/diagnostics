import { describe, expect, it } from "vitest";
import type {
  ExtensionError,
  ExtensionInfo,
  KeyedNavLink,
} from "../../../app/types";
import {
  byKey,
  isExtensionInfo,
  toNavLink,
  when,
} from "../../../app/utils/extensions";

describe("app/utils/extensions", () => {
  describe("isExtensionInfo", () => {
    it("should return true for valid ExtensionInfo", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
        config: { key: "value" },
        stageDefinition: { stage: ["step1", "step2"] },
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it("should return true for ExtensionInfo without optional fields", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
      };

      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it("should return false for ExtensionError", () => {
      const extensionError: ExtensionError = {
        lastError: {
          errorMessage: "Something went wrong",
          time: "2023-01-01T00:00:00Z",
        },
      };

      expect(isExtensionInfo(extensionError)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe("byKey", () => {
    it("should return -1 when first key is lexicographically smaller", () => {
      const a: KeyedNavLink = { key: "a", name: "A" };
      const b: KeyedNavLink = { key: "b", name: "B" };

      expect(byKey(a, b)).toBe(-1);
    });

    it("should return 1 when first key is lexicographically larger", () => {
      const a: KeyedNavLink = { key: "c", name: "C" };
      const b: KeyedNavLink = { key: "b", name: "B" };

      expect(byKey(a, b)).toBe(1);
    });

    it("should return 0 when keys are equal", () => {
      const a: KeyedNavLink = { key: "same", name: "A" };
      const b: KeyedNavLink = { key: "same", name: "B" };

      expect(byKey(a, b)).toBe(0);
    });
  });

  describe("toNavLink", () => {
    it("should convert ExtensionInfo to KeyedNavLink with extensionName as key and name", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
        config: { key: "value" },
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: "test-extension",
        name: "test-extension",
      });
    });

    it("should work with simple extensionName", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "simple",
      };

      const result = toNavLink(extensionInfo);

      expect(result).toEqual({
        key: "simple",
        name: "simple",
      });
    });
  });

  describe("when", () => {
    it("should return array with value when condition is truthy", () => {
      const result = when(true, "test");
      expect(result).toEqual(["test"]);

      const result2 = when("non-empty", 42);
      expect(result2).toEqual([42]);

      const result3 = when([], "test");
      expect(result3).toEqual(["test"]);
    });

    it("should return empty array when condition is falsy", () => {
      expect(when(false, "test")).toEqual([]);
      expect(when("", "test")).toEqual([]);
      expect(when(null, "test")).toEqual([]);
      expect(when(undefined, "test")).toEqual([]);
      expect(when(0, "test")).toEqual([]);
      expect(when(NaN, "test")).toEqual([]);
    });

    it("should work with generic types", () => {
      const result: string[] = when(true, "test");
      expect(result).toEqual(["test"]);

      const result2: number[] = when(false, 42);
      expect(result2).toEqual([]);
    });
  });
});
