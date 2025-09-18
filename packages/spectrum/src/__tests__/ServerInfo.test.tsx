import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";
import { render } from "./test-utils";

describe("ServerInfo", () => {
  it("renders correctly", () => {
    const serverInfoProps = {
      deploymentId: "dep-123",
      extensionSync: { totalSyncAllCount: 5 },
      hostname: "localhost",
      nodeVersions: "v18.0.0",
      serverId: "srv-456",
      uptime: 123456,
    };
    const { container } = render(<ServerInfo {...serverInfoProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
