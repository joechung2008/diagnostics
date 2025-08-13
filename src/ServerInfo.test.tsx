import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "./ServerInfo";

const mockProps = {
  deploymentId: "deploy-123",
  extensionSync: { totalSyncAllCount: 42 },
  hostname: "server.example.com",
  nodeVersions: "v18.0.0",
  serverId: "srv-456",
  uptime: "2 days",
};

describe("ServerInfo", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<ServerInfo {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
