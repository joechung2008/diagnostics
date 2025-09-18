import ServerInfo from "@/ServerInfo";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ServerInfo", () => {
  it("matches snapshot with sample data", () => {
    const props = {
      deploymentId: "deploy-123",
      extensionSync: { totalSyncAllCount: 42 },
      hostname: "server.example.com",
      nodeVersions: "v18.19.0",
      serverId: "srv-abc",
      uptime: 987654,
    };
    const { asFragment } = render(<ServerInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with empty/minimal data", () => {
    const props = {
      deploymentId: "",
      extensionSync: { totalSyncAllCount: 0 },
      hostname: "",
      nodeVersions: "",
      serverId: "",
      uptime: 0,
    };
    const { asFragment } = render(<ServerInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
