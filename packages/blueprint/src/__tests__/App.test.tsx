import { render } from "@testing-library/react";
import useSWR from "swr";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("swr");

describe("App", () => {
  const mockUseSWR = vi.mocked(useSWR);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the loading state while loading", async () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: vi.fn(),
      isValidating: false,
    });

    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the error state on fetch failure", async () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch diagnostics"),
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the initial loaded state", async () => {
    mockUseSWR.mockReturnValue({
      data: {
        buildInfo: {
          buildVersion: "1.0.0",
        },
        extensions: {
          websites: { extensionName: "websites" },
          paasserverless: { extensionName: "paasserverless" },
        },
        serverInfo: {
          deploymentId: "deployment-123",
          extensionSync: {
            totalSyncAllCount: 0,
          },
          hostname: "localhost",
          nodeVersions: "v18.0.0",
          serverId: "server-abc",
          uptime: 123456,
        },
      },
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
