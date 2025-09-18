import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";
import { render } from "./test-utils";

describe("ServerInfo", () => {
  it("should render the server info in a table", () => {
    const props: ServerInfoProps = {
      hostname: "host",
      uptime: 123,
      serverId: "id",
      deploymentId: "dep",
      nodeVersions: "v1",
      extensionSync: { totalSyncAllCount: 10 },
    };
    const { container } = render(<ServerInfo {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
