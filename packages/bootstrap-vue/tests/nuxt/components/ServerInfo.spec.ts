import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ServerInfo from "../../../app/components/ServerInfo.vue";

describe("ServerInfo", () => {
  const baseProps = {
    hostname: "test-server",
    serverId: "server-123",
    deploymentId: "deploy-456",
    extensionSync: {
      totalSyncAllCount: 42
    }
  };

  it("should render required server information", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: baseProps
    });

    expect(wrapper.text()).toContain("Hostname");
    expect(wrapper.text()).toContain("test-server");
    expect(wrapper.text()).toContain("Server ID");
    expect(wrapper.text()).toContain("server-123");
    expect(wrapper.text()).toContain("Deployment ID");
    expect(wrapper.text()).toContain("deploy-456");
    expect(wrapper.text()).toContain("Extension Sync | Total Sync All Count");
    expect(wrapper.text()).toContain("42");
  });

  it("should render uptime when provided", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 3600
      }
    });

    expect(wrapper.text()).toContain("Uptime");
    expect(wrapper.text()).toContain("3600");
  });

  it("should not render uptime when undefined", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: baseProps
    });

    expect(wrapper.text()).not.toContain("Uptime");
  });

  it("should render node versions when provided", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: {
        ...baseProps,
        nodeVersions: "v18.17.0"
      }
    });

    expect(wrapper.text()).toContain("Node Versions");
    expect(wrapper.text()).toContain("v18.17.0");
  });

  it("should not render node versions when undefined", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: baseProps
    });

    expect(wrapper.text()).not.toContain("Node Versions");
  });

  it("should render table with correct structure", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: {
        ...baseProps,
        uptime: 1234,
        nodeVersions: "v20.0.0"
      }
    });

    const table = wrapper.find("table");
    expect(table.exists()).toBe(true);

    // Check for table headers
    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe("Name");
    expect(headers[1].text()).toBe("Value");

    // Should have 6 rows: hostname, uptime, serverId, deploymentId, nodeVersions, extensionSync
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(6);
  });

  it("should handle zero extension sync count", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: {
        ...baseProps,
        extensionSync: {
          totalSyncAllCount: 0
        }
      }
    });

    expect(wrapper.text()).toContain("0");
  });

  it("should handle large extension sync count", async () => {
    const wrapper = await mountSuspended(ServerInfo, {
      props: {
        ...baseProps,
        extensionSync: {
          totalSyncAllCount: 999999
        }
      }
    });

    expect(wrapper.text()).toContain("999999");
  });
});
