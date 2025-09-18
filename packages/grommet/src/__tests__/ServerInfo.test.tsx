import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("matches snapshot", () => {
    const props = {
      deploymentId: "dev-123",
      extensionSync: { totalSyncAllCount: 5 },
      hostname: "localhost",
      nodeVersions: "node: 18.0.0, npm: 9.0.0",
      serverId: "srv-001",
      uptime: 123456,
    };
    const { container } = render(<ServerInfo {...props} />);
    expect(container).toMatchSnapshot();
  });
});
