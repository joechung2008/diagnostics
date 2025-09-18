import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("renders hostname", () => {
    const { getByText } = render(() => (
      <ServerInfo
        deploymentId="deploy-123"
        extensionSync={{ totalSyncAllCount: 5 }}
        hostname="server.local"
        nodeVersions="v18.0.0"
        serverId="srv-001"
        uptime={3600}
      />
    ));
    expect(getByText("server.local")).toBeInTheDocument();
  });
});
