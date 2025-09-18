import { describe, expect, it, beforeEach, afterEach, vi } from "vitest"
import { ref } from "vue"
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import App from "../../app/app.vue"

describe("App", () => {
  const { useFetchMock } = vi.hoisted(() => ({
    useFetchMock: vi.fn()
  }))

  beforeEach(() => {
    // install the Nuxt import mock before each test
    mockNuxtImport("useFetch", () => useFetchMock)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("shows loading spinner when pending", async () => {
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(true),
      error: ref(undefined),
      refresh: vi.fn()
    }))

    // mount with real components (no stubs)
    const wrapper = await mountSuspended(App)

    // wrapper is a VTU wrapper; check spinner exists using Naive class
    expect(wrapper.find(".n-base-loading").exists()).toBe(true)
  })

  it("shows error when useFetch returns an error", async () => {
    const error = new Error("boom")
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(false),
      error: ref(error),
      refresh: vi.fn()
    }))

    // mount with real components (no stubs)
    const wrapper = await mountSuspended(App)

    // check the Naive UI alert exists
    expect(wrapper.find(".n-alert").exists()).toBe(true)
    // check the error message text is present
    expect(wrapper.text()).toContain("boom")
  })

  it("renders extensions and responds to link click", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    }

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }))

    // mount with real components (no stubs)
    const wrapper = await mountSuspended(App)

    // find extension button inside Extensions stub (avoid clicking other buttons)
    const btn = wrapper.find(".extensions button")
    expect(btn.exists()).toBe(true)

    await btn.trigger("click")
    // wait for the parent to receive the event and update
    await wrapper.vm.$nextTick()

    // after clicking the extension, the Extension component should render
    expect(wrapper.find(".extension").exists()).toBe(true)
  })
})
