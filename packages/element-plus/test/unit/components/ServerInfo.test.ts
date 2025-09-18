import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import ServerInfo from "../../../app/components/ServerInfo.vue"

describe("ServerInfo.vue", () => {
  it("renders server info rows", () => {
    const props = {
      hostname: "host",
      uptime: 1,
      serverId: "srv1",
      deploymentId: "dep1",
      nodeVersions: "v18",
      extensionSync: { totalSyncAllCount: 5 }
    }

    const wrapper = mount(ServerInfo, { props })

    expect(wrapper.text()).toContain("Hostname")
    expect(wrapper.text()).toContain("host")
    expect(wrapper.text()).toContain("Uptime")
    expect(wrapper.text()).toContain("1")
    expect(wrapper.text()).toContain("Server ID")
    expect(wrapper.text()).toContain("srv1")
    expect(wrapper.text()).toContain("Extension Sync | Total Sync All Count")
    expect(wrapper.text()).toContain("5")
  })
})
