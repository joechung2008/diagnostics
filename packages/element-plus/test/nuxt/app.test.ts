import App from "@/app.vue"
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ref } from "vue"
import type { Diagnostics } from "../../app/types"

describe("app.vue", () => {
  // Hoist the mock so it exists at module initialization time
  // and avoids timing/race issues when the component or
  // test utils import/use `useFetch`.
  const { useFetchMock } = vi.hoisted(() => ({
    useFetchMock: vi.fn()
  }))

  beforeEach(() => {
    mockNuxtImport("useFetch", () => useFetchMock)
  })

  it("renders a loading message while fetching data", async () => {
    useFetchMock.mockImplementation(() => ({
      data: ref(),
      error: ref(),
      pending: ref(true)
    }))

    const wrapper = await mountSuspended(App)
    expect(wrapper.text()).toContain("Loading...")
  })

  it("renders an error message when fetching data fails", async () => {
    // Use mockImplementation to create fresh Vue refs each call.
    // Avoid shared reactive state that would happen with
    // `mockReturnValue`.
    useFetchMock.mockImplementation(() => ({
      data: ref(),
      error: ref(new Error("fetch failed")),
      pending: ref(false)
    }))

    const wrapper = await mountSuspended(App)
    expect(wrapper.text()).toContain("Error: fetch failed")
  })

  it("renders extensions and displays selected extension when clicked", async () => {
    useFetchMock.mockImplementation(() => ({
      data: ref<Diagnostics>({
        extensions: {
          paasserverless: { extensionName: "paasserverless" },
          websites: { extensionName: "websites" }
        },
        buildInfo: { buildVersion: "1.2.3" },
        serverInfo: {
          hostname: "host",
          uptime: 1,
          serverId: "s",
          deploymentId: "d",
          nodeVersions: "v",
          extensionSync: { totalSyncAllCount: 0 }
        }
      }),
      error: ref(undefined),
      pending: ref(false)
    }))

    const wrapper = await mountSuspended(App)
    const nav = wrapper.find("nav.extensions")
    expect(nav.exists()).toBe(true)

    const buttons = nav.findAll("button")
    expect(buttons.length).toBeGreaterThanOrEqual(2)

    await buttons[0].trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain("paasserverless")
  })
})
