import App from "@/App";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useSWR from "swr";

vi.mock("swr");

const mockUseSWR = vi.mocked(useSWR);

const mockData = {
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
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
) as unknown as typeof window.fetch;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("App", () => {
  it("renders loading state while loading", async () => {
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

  it("renders error state when diagnostics fail to load", async () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Test error"),
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders initial loaded state diagnostics load", async () => {
    mockUseSWR.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
