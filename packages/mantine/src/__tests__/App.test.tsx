import { screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { render } from "./test-utils";

const originalFetch = globalThis.fetch;

describe("App", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should render null when diagnostics is not loaded", async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(null),
    });

    render(<App />);

    // Wait for the async fetch to complete and state to update
    await waitFor(() => {
      // Check that no content is rendered (App returns null)
      expect(screen.queryByText(/./)).toBeNull();
    });
  });

  it("should render tabs when diagnostics is loaded", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve<Diagnostics>({
          buildInfo: { buildVersion: "1.0" },
          extensions: {},
          serverInfo: {
            hostname: "host",
            serverId: "id",
            deploymentId: "dep",
            extensionSync: { totalSyncAllCount: 0 },
          },
        }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Extensions")).toBeInTheDocument();
    });
  });
});
