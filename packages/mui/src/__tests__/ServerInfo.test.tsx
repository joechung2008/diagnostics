import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("matches snapshot", () => {
    const props = {
      deploymentId: "deploy-1",
      extensionSync: { totalSyncAllCount: 1 },
      hostname: "localhost",
      nodeVersions: "v18.0.0",
      serverId: "server-1",
      uptime: 100,
    };
    const { container } = render(<ServerInfo {...props} />);
    expect(container).toMatchSnapshot();
  });
});
