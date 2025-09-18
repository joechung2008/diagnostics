import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import ServerInfo from "../../../app/components/ServerInfo.vue"
import type { ServerInfoProps } from "../../../app/types/ServerInfoProps"
import provide from "../../utils/defaultProvider"

describe("ServerInfo.vue", () => {
  it("should render hostname and server id rows and handle optional fields", () => {
    const props: ServerInfoProps = {
      deploymentId: "dep-1",
      extensionSync: {
        totalSyncAllCount: 5
      },
      hostname: "host1",
      nodeVersions: undefined,
      serverId: "srv-1",
      uptime: undefined
    }

    const { getByText, queryByText } = render(ServerInfo, {
      props,
      global: { provide }
    })

    // Hostname
    expect(getByText("Hostname")).toBeTruthy()
    expect(getByText("host1")).toBeTruthy()

    // Server ID
    expect(getByText("Server ID")).toBeTruthy()
    expect(getByText("srv-1")).toBeTruthy()

    // Uptime
    expect(queryByText("Uptime")).toBeNull()

    // Node Versions
    expect(queryByText("Node Versions")).toBeNull()

    // Extension Sync | Total Sync All Count
    expect(getByText("Extension Sync | Total Sync All Count")).toBeTruthy()
    expect(getByText("5")).toBeTruthy()
  })
})
