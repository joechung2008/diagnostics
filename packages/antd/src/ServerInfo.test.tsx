import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "./ServerInfo";

describe("ServerInfo", () => {
  it("renders the server info table", () => {
    render(
      <ServerInfo
        deploymentId="deploy-1"
        extensionSync={{ totalSyncAllCount: 5 }}
        hostname="localhost"
        nodeVersions="v18.0.0"
        serverId="server-1"
        uptime={12345}
      />
    );
    expect(screen.getByLabelText("Server Info")).toBeInTheDocument();
  });
});
