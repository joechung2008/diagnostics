import App from "@/App";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {
          foo: {
            extensionName: "foo",
            config: { X: "1" },
            stageDefinition: { build: ["a"] },
          },
        },
        serverInfo: {
          deploymentId: "d",
          extensionSync: { totalSyncAllCount: 1 },
          hostname: "h",
          nodeVersions: "v1",
          serverId: "s",
          uptime: 1,
        },
      }),
  })
) as unknown as typeof window.fetch;

describe("App", () => {
  it("matches snapshot after diagnostics load", async () => {
    const { asFragment, findByText } = render(<App />);
    await findByText("Extensions");
    expect(asFragment()).toMatchSnapshot();
  });
});
