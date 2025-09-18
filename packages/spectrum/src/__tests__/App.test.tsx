import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { render } from "./test-utils";

describe("App", () => {
  const mockFetch = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  const mockDiagnostics = {
    buildInfo: {
      buildVersion: "123",
      commitHash: "abc123",
      buildTime: "2023-01-01T00:00:00Z",
    },
    extensions: {
      ext1: {
        extensionName: "extension1",
        config: { key: "value" },
        navLinks: [{ key: "link1", text: "Link 1", href: "/link1" }],
      },
      paasserverless: {
        extensionName: "paasserverless",
        config: { key: "value" },
        navLinks: [],
      },
      websites: {
        extensionName: "websites",
        config: { key: "value" },
        navLinks: [],
      },
    },
    serverInfo: {
      serverName: "test-server",
      version: "1.0.0",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockDiagnostics),
    } as Response);
  });

  it("renders app after loading diagnostics", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Public Cloud")).toBeInTheDocument();
    });

    // Check that tabs are present
    expect(screen.getAllByText("Build Information").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Server Information").length).toBeGreaterThan(0);
  });

  it("fetches diagnostics on mount", async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://hosting.portal.azure.net/api/diagnostics"
      );
    });
  });

  it("switches environment when menu item is clicked", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Public Cloud")).toBeInTheDocument();
    });

    const menuTrigger = screen.getByRole("button", { name: "Public Cloud" });
    fireEvent.click(menuTrigger);

    const fairfaxOption = screen.getByText("Fairfax");
    fireEvent.click(fairfaxOption);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
      );
    });
  });

  it("shows paasserverless button when extension exists", async () => {
    render(<App />);

    await waitFor(() => {
      const buttons = screen.getAllByText("paasserverless");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it("shows websites button", async () => {
    render(<App />);

    await waitFor(() => {
      const buttons = screen.getAllByText("websites");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it("switches tabs correctly", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Public Cloud")).toBeInTheDocument();
    });

    // Find the build tab by role
    const buildTab = screen.getByRole("tab", { name: "Build Information" });
    fireEvent.click(buildTab);

    // Should show build info content
    await waitFor(() => {
      expect(screen.getByText("123")).toBeInTheDocument();
    });
  });

  it("renders extensions tab by default", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Public Cloud")).toBeInTheDocument();
    });

    // The extensions tab should be selected by default
    const selectedTab = screen.getByRole("tab", { selected: true });
    expect(selectedTab).toHaveTextContent("Extensions");
  });
});
