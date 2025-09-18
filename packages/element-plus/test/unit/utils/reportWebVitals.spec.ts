import { beforeEach, describe, expect, it, vi } from "vitest"

// Set up spies
const onCLS = vi.fn()
const onINP = vi.fn()
const onFCP = vi.fn()
const onLCP = vi.fn()
const onTTFB = vi.fn()

// Set up module
vi.mock("web-vitals", () => ({
  onCLS,
  onINP,
  onFCP,
  onLCP,
  onTTFB
}))

describe("utils/reportWebVitals", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("does not call the callback when not provided one", async () => {
    const { default: reportWebVitals } = await import(
      "../../../app/utils/reportWebVitals"
    )

    reportWebVitals()
    await new Promise(requestAnimationFrame)

    expect(onCLS).not.toHaveBeenCalled()
    expect(onINP).not.toHaveBeenCalled()
    expect(onFCP).not.toHaveBeenCalled()
    expect(onLCP).not.toHaveBeenCalled()
    expect(onTTFB).not.toHaveBeenCalled()
  })

  it("should call the provided callback", async () => {
    const { default: reportWebVitals } = await import(
      "../../../app/utils/reportWebVitals"
    )
    const handler = vi.fn()

    reportWebVitals(handler)
    await new Promise(requestAnimationFrame)

    expect(onCLS).toHaveBeenCalledWith(handler)
    expect(onINP).toHaveBeenCalledWith(handler)
    expect(onFCP).toHaveBeenCalledWith(handler)
    expect(onLCP).toHaveBeenCalledWith(handler)
    expect(onTTFB).toHaveBeenCalledWith(handler)
  })
})
