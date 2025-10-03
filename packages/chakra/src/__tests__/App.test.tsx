import { act, render, screen } from "@testing-library/react";
import useSWR from "swr";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { TestWrapper } from "./test-utils";

// Mock useSWR
vi.mock("swr", () => ({
  default: vi.fn(),
}));

const mockUseSWR = vi.mocked(useSWR);

const mockDiagnosticsData = {
  buildInfo: { buildVersion: "1.2.3" },
  extensions: {
    testExtension: {
      extensionName: "Test Extension",
      config: { key1: "value1" },
      stageDefinition: { stage1: ["step1"] },
    },
    paasserverless: {
      extensionName: "PaaS Serverless",
      config: { enabled: "true" },
    },
    websites: {
      extensionName: "Websites",
      config: { version: "2.0" },
    },
  },
  serverInfo: {
    deploymentId: "deploy-123",
    extensionSync: { totalSyncAllCount: 42 },
    hostname: "server.example.com",
    nodeVersions: "v18.17.0",
    serverId: "server-456",
    uptime: 1234567890,
  },
};

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSWR.mockReturnValue({
      data: mockDiagnosticsData,
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });
  });

  it("should render loading state with spinner when isLoading is true", async () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: vi.fn(),
      isValidating: false,
    });

    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    // When isLoading is true, the spinner should be present
    expect(screen.getByLabelText("Loading...")).toBeInTheDocument();
  });

  it("should render app with default environment", async () => {
    const { asFragment } = await act(async () =>
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      )
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display environment selector with default value", async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.getByRole("button", { name: "Public Cloud" })
    ).toBeInTheDocument();
  });

  it("should render tabs for navigation", async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(screen.getByRole("tab", { name: "Extensions" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Build Information" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Server Information" })
    ).toBeInTheDocument();
  });

  it("should display extensions tab by default", async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    // Should show extensions content by default
    expect(screen.getByText("Test Extension")).toBeInTheDocument();
  });

  it("should not show paasserverless button when extension does not exist", async () => {
    mockUseSWR.mockReturnValue({
      data: {
        ...mockDiagnosticsData,
        extensions: {
          ...mockDiagnosticsData.extensions,
          paasserverless: undefined,
        },
      },
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
      isValidating: false,
    });

    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.queryByRole("button", { name: "paasserverless" })
    ).not.toBeInTheDocument();
  });

  it("should show websites button", async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.getByRole("button", { name: "websites" })
    ).toBeInTheDocument();
  });

  it("should render color mode button", async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    // Color mode button should be present
    expect(
      screen.getByRole("button", { name: /color mode/i })
    ).toBeInTheDocument();
  });
});
