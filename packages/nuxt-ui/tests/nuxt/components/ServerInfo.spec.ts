import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ServerInfo from "../../../app/components/ServerInfo.vue";
import type { ServerInfoProps } from "../../../app/types";

describe("app/components/ServerInfo.vue", () => {
  it("should mount", async () => {
    const props: ServerInfoProps = {
      hostname: "test-server",
      serverId: "server-123",
      deploymentId: "deploy-456",
      extensionSync: {
        totalSyncAllCount: 10,
      },
    };

    const component = await mountSuspended(ServerInfo, {
      props,
    });
    expect(component).toBeDefined();
  });

  it("should render server info with required fields", async () => {
    const props: ServerInfoProps = {
      hostname: "production-server-01",
      serverId: "srv-2024-001",
      deploymentId: "deploy-v3.2.1",
      extensionSync: {
        totalSyncAllCount: 42,
      },
    };

    const { html } = await renderSuspended(ServerInfo, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should render server info with optional fields", async () => {
    const props: ServerInfoProps = {
      hostname: "staging-server-02",
      serverId: "srv-stage-002",
      deploymentId: "deploy-staging-v1.4",
      uptime: 123456789,
      nodeVersions: "18.17.0 LTS",
      extensionSync: {
        totalSyncAllCount: 25,
      },
    };

    const { html } = await renderSuspended(ServerInfo, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });
});
