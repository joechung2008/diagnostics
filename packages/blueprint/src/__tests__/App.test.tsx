import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

// Diagnostics mock adhering to the Diagnostics type definition
const diagnostics = {
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
};

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ json: () => Promise.resolve(diagnostics) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(<App />);
    await waitFor(() =>
      expect(
        screen.getByRole("tab", { name: /Extensions/i })
      ).toBeInTheDocument()
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("switches tabs when clicked", async () => {
    render(<App />);

    // Wait for tabs to appear
    await waitFor(() =>
      expect(
        screen.getByRole("tab", { name: /Extensions/i })
      ).toBeInTheDocument()
    );

    // Extensions tab should be selected by default
    expect(screen.getByRole("tab", { name: /Extensions/i })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    // Switch to Build Information tab
    fireEvent.click(screen.getByRole("tab", { name: /Build Information/i }));
    expect(
      screen.getByRole("tab", { name: /Build Information/i })
    ).toHaveAttribute("aria-selected", "true");

    // Check for content in BuildInfo table
    expect(screen.getByText("Build Version")).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();

    // Switch to Server Information tab
    fireEvent.click(screen.getByRole("tab", { name: /Server Information/i }));
    expect(
      screen.getByRole("tab", { name: /Server Information/i })
    ).toHaveAttribute("aria-selected", "true");

    // Check for content in ServerInfo
    expect(screen.getByText("deployment-123")).toBeInTheDocument();
    expect(screen.getByText("localhost")).toBeInTheDocument();
  });
});
