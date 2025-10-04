import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import * as swr from "swr";
import App from "../App";

const mockDiagnostics = {
  buildInfo: {},
  extensions: {
    websites: { extensionName: "Websites" },
    paasserverless: { extensionName: "PaaS Serverless" },
  },
  serverInfo: {
    deploymentId: "test-deployment",
    extensionSync: { totalSyncAllCount: 42 },
    hostname: "test-host",
    nodeVersions: "v18",
    serverId: "test-server",
    uptime: 86400,
  },
};

vi.mock("swr", () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  (swr.default as Mock).mockReturnValue({
    data: mockDiagnostics,
    error: undefined,
    isLoading: false,
  });
  global.scrollTo = vi.fn();
});

describe("App", () => {
  it("renders nothing while loading", () => {
    (swr.default as Mock).mockReturnValueOnce({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders error message on fetch error", () => {
    (swr.default as Mock).mockReturnValueOnce({
      data: undefined,
      error: new Error("Network error"),
      isLoading: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders Extensions tab by default", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
