import { render } from "@testing-library/react";
import useSWR from "swr";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("swr");

// Mock matchMedia for theme detection
const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false, // Default to light theme
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

vi.stubGlobal("matchMedia", mockMatchMedia);

describe("App", () => {
  const mockDiagnostics = {
    buildInfo: { buildVersion: "1.0.0" },
    extensions: {
      websites: { extensionName: "websites" },
      paasserverless: { extensionName: "paasserverless" },
      testExt: { extensionName: "testExt" },
    },
    serverInfo: {
      hostname: "test-server",
      deploymentId: "123",
      extensionSync: { totalSyncAllCount: 5 },
      nodeVersions: "18.0.0",
      serverId: "server-1",
      uptime: 3600,
    },
  };

  it("shows loading spinner while loading diagnostics", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("shows error alert when diagnostics could not be loaded", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: new Error("Failed to load"),
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("shows UI when diagnostics are loaded", () => {
    vi.mocked(useSWR).mockReturnValue({
      data: mockDiagnostics,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
