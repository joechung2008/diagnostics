import { createTheme } from "@mui/material";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

// Mock useSWR
const mockUseSWR = vi.fn();
vi.doMock("swr", () => ({
  default: mockUseSWR,
}));

// Mock useSystemTheme
vi.doMock("../useSystemTheme", () => ({
  useSystemTheme: vi.fn(() => createTheme()),
}));

const diagnostics = {
  buildInfo: { buildVersion: "1.0.0" },
  extensions: {
    ext1: { extensionName: "ext1" },
  },
  serverInfo: {
    deploymentId: "deploy-1",
    extensionSync: { totalSyncAllCount: 1 },
    hostname: "localhost",
    nodeVersions: "v18.0.0",
    serverId: "server-1",
    uptime: 100,
  },
};

describe("App", () => {
  it("matches snapshot in loading state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot in error state", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      isLoading: false,
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot in initial loaded state", () => {
    mockUseSWR.mockReturnValue({
      data: diagnostics,
      error: undefined,
      isLoading: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
