import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const mockDiagnostics = {
  buildInfo: { buildVersion: "1.0.0" },
  extensions: {
    websites: {
      extensionName: "Websites",
      config: {},
      stageDefinition: {},
    },
  },
  serverInfo: {
    deploymentId: "deploy-1",
    extensionSync: { totalSyncAllCount: 1 },
    hostname: "localhost",
    nodeVersions: "v18.0.0",
    serverId: "server-1",
    uptime: "1 day",
  },
};

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(mockDiagnostics),
  }) as unknown as typeof globalThis.fetch;
});

afterEach(() => {
  vi.resetAllMocks();
  globalThis.fetch = originalFetch;
});

describe("App", () => {
  it("renders Extensions tab after loading diagnostics", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Extensions")).toBeInTheDocument();
    });
  });
});
