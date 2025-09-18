import { describe, it, expect } from "vitest"
import { isExtensionInfo, byKey, toNavLink, when } from "../../../app/utils/extensions"
import type { ExtensionInfo } from "../../../app/types/Extension"
import type { KeyedNavLink } from "../../../app/types/ExtensionsProps"

describe("extensions utils", () => {
  it("isExtensionInfo correctly narrows", () => {
    const info: ExtensionInfo = { extensionName: "ext1" }
    const unknown: undefined = undefined

    expect(isExtensionInfo(info)).toBe(true)
    expect(isExtensionInfo(unknown)).toBe(false)
  })

  it("byKey sorts by key", () => {
    const a: KeyedNavLink = { key: "a", name: "a" }
    const b: KeyedNavLink = { key: "b", name: "b" }
    expect(byKey(a, b)).toBe(-1)
    expect(byKey(b, a)).toBe(1)
    expect(byKey(a, a)).toBe(0)
  })

  it("toNavLink maps ExtensionInfo to KeyedNavLink", () => {
    const info: ExtensionInfo = { extensionName: "hello" }
    const nav = toNavLink(info)
    expect(nav.key).toBe("hello")
    expect(nav.name).toBe("hello")
  })

  it("when returns args only when condition true", () => {
    expect(when(true, 1, 2, 3)).toEqual([1, 2, 3])
    expect(when(false, 1, 2)).toEqual([])
  })
})
