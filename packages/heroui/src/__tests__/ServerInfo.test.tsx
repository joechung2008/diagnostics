import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <ServerInfo
        deploymentId="test-deployment"
        extensionSync={{ totalSyncAllCount: 0 }}
        hostname="localhost"
        nodeVersions="v18.0.0"
        serverId="test-server"
        uptime={12345}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
