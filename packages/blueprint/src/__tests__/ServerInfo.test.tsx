import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("matches snapshot", () => {
    const mockProps = {
      deploymentId: "deploy123",
      extensionSync: { totalSyncAllCount: 0 },
      hostname: "localhost",
      nodeVersions: "",
      os: "Windows",
      serverVersion: "1.0.0",
      serverId: "server123",
      uptime: 1000,
    };
    const { asFragment } = render(<ServerInfo {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
