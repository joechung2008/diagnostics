import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ServerInfo from "@/lib/components/ServerInfo.svelte";

describe("ServerInfo", () => {
  it("renders server hostname", () => {
    render(ServerInfo, {
      deploymentId: "deploymentId",
      extensionSync: {
        totalSyncAllCount: 123
      },
      hostname: "hostname",
      nodeVersions: "nodeVersions",
      serverId: "serverId",
      uptime: 456
    });
    expect(screen.getByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("hostname")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("456")).toBeInTheDocument();
    expect(screen.getByText("Server ID")).toBeInTheDocument();
    expect(screen.getByText("serverId")).toBeInTheDocument();
    expect(screen.getByText("Deployment ID")).toBeInTheDocument();
    expect(screen.getByText("deploymentId")).toBeInTheDocument();
    expect(screen.getByText("Node Versions")).toBeInTheDocument();
    expect(screen.getByText("nodeVersions")).toBeInTheDocument();
    expect(screen.getByText("Extension Sync | Total Sync All Count")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });
});
