import useSWR from "swr";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { render } from "./test-utils";

vi.mock("swr");

const mockUseSWR = vi.mocked(useSWR);

const mockDiagnostics = {
  buildInfo: {
    buildVersion: "123",
  },
  extensions: {
    ext1: {
      extensionName: "extension1",
      config: { key: "value" },
    },
    paasserverless: {
      extensionName: "paasserverless",
      config: { key: "value" },
    },
    websites: {
      extensionName: "websites",
      config: { key: "value" },
    },
  },
  serverInfo: {
    deploymentId: "test-deployment",
    extensionSync: {
      totalSyncAllCount: 42,
    },
    hostname: "test-host",
    nodeVersions: "v18.0.0",
    serverId: "test-server-id",
    uptime: 3600,
  },
};

describe("App", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading state initially", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders error state on fetch failure", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: new Error("Fetch error"),
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders app after loading diagnostics", () => {
    mockUseSWR.mockReturnValue({
      data: mockDiagnostics,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("shows paasserverless button when extension exists", () => {
    mockUseSWR.mockReturnValue({
      data: mockDiagnostics,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("does not show paasserverless button when extension does not exist", () => {
    const diagnosticsWithoutPaas = {
      ...mockDiagnostics,
      extensions: {
        ...mockDiagnostics.extensions,
        paasserverless: undefined,
      },
    };
    mockUseSWR.mockReturnValue({
      data: diagnosticsWithoutPaas,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("shows websites button", () => {
    mockUseSWR.mockReturnValue({
      data: mockDiagnostics,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
