import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../../app/app.vue";
import type { Diagnostics } from "../../app/types";

describe("app/app.vue", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    // Restore original fetch after each test
    global.fetch = originalFetch;
  });

  it("should mount", async () => {
    const component = await mountSuspended(App);
    expect(component).toBeDefined();
  });

  it("should render initial state with mocked Diagnostics", async () => {
    // Mock Diagnostics object
    const mockDiagnostics: Diagnostics = {
      buildInfo: {
        buildVersion: "1.0.0-test",
      },
      extensions: {
        testExtension: {
          extensionName: "Test Extension",
          config: {
            enabled: "true",
            version: "1.0",
          },
        },
      },
      serverInfo: {
        deploymentId: "test-deployment-id",
        extensionSync: {
          totalSyncAllCount: 5,
        },
        hostname: "test-hostname",
        nodeVersions: "18.17.0",
        serverId: "test-server-id",
        uptime: 3600,
      },
    };

    // Mock the global fetch function to return the mocked Diagnostics
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnostics),
    });

    // Replace global fetch with the mock
    global.fetch = mockFetch;

    const { html } = await renderSuspended(App);

    expect(html()).toMatchSnapshot();
  });

  it("should render initial state with paasserverless extension", async () => {
    // Mock Diagnostics object with paasserverless extension
    const mockDiagnostics: Diagnostics = {
      buildInfo: {
        buildVersion: "1.0.0-paas",
      },
      extensions: {
        paasserverless: {
          extensionName: "PaaS Serverless Extension",
          config: {
            provider: "azure",
            runtime: "node.js",
          },
        },
        websites: {
          extensionName: "Websites Extension",
          config: {
            enabled: "true",
          },
        },
      },
      serverInfo: {
        deploymentId: "paas-deployment-id",
        extensionSync: {
          totalSyncAllCount: 10,
        },
        hostname: "paas-hostname",
        nodeVersions: "20.0.0",
        serverId: "paas-server-id",
        uptime: 7200,
      },
    };

    // Mock the global fetch function to return the mocked Diagnostics
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnostics),
    });

    // Replace global fetch with the mock
    global.fetch = mockFetch;

    const { html } = await renderSuspended(App);

    expect(html()).toMatchSnapshot();
  });
});
