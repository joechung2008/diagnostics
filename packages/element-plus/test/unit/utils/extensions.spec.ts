import {
  byKey,
  isExtensionInfo,
  toNavLink
} from "../../../app/utils/extensions"
import { describe, expect, it } from "vitest"

describe("utils/extensions", () => {
  describe("isExtensionInfo", () => {
    it("isExtensionInfo identifies ExtensionInfo", () => {
      const info = { extensionName: "ext1" }
      expect(isExtensionInfo(info)).toBe(true)
    })

    it("isExtensionInfo rejects undefined and non-extension info", () => {
      expect(isExtensionInfo(undefined)).toBe(false)
    })
  })

  describe("byKey", () => {
    it("should sort keyed nav links", () => {
      const a = { key: "a" }
      const b = { key: "b" }
      expect(byKey(a, b)).toBeLessThan(0)
      expect(byKey(b, a)).toBeGreaterThan(0)
      expect(byKey(a, a)).toBe(0)
    })
  })

  describe("toNavLink", () => {
    it("should convert ExtensionInfo to KeyedNavLink", () => {
      const out = toNavLink({ extensionName: "myExt" })
      expect(out).toEqual({ key: "myExt", name: "myExt", url: "" })
    })
  })
})
