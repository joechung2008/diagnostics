import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

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
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(diagnostics),
        })
      )
    );
  });

  it("matches snapshot in loading state", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})) // never resolves
    );
    const { asFragment } = render(<App />);
    // App returns null in loading state, so fragment should be empty
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });

  it("renders main UI after diagnostics fetch", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("tab", { name: /Extensions/i })).not.toBeNull();
      expect(
        screen.getByRole("tab", { name: /Build Information/i })
      ).not.toBeNull();
      expect(
        screen.getByRole("tab", { name: /Server Information/i })
      ).not.toBeNull();
    });
  });

  it("matches snapshot after diagnostics fetch", async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("tab", { name: /Extensions/i })
      ).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot after switching to Build Information tab", async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs[1]).toBeInTheDocument(); // Build Information tab
    });
    const tabs = screen.getAllByRole("tab");
    fireEvent.click(tabs[1]); // Build Information tab
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot after switching to Server Information tab", async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => {
      const tabs = screen.getAllByRole("tab");
      expect(tabs[2]).toBeInTheDocument(); // Server Information tab
    });
    const tabs = screen.getAllByRole("tab");
    fireEvent.click(tabs[2]); // Server Information tab
    expect(asFragment()).toMatchSnapshot();
  });
});
