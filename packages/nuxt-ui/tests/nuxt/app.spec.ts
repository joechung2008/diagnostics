import {
  mockNuxtImport,
  mountSuspended,
  renderSuspended,
} from "@nuxt/test-utils/runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import App from "../../app/app.vue";
import type { Diagnostics } from "../../app/types";

describe("app/app.vue", () => {
  const { useFetchMock } = vi.hoisted(() => ({
    useFetchMock: vi.fn(),
  }));

  beforeEach(() => {
    // install the Nuxt import mock before each test
    mockNuxtImport("useFetch", () => useFetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

    useFetchMock.mockImplementation(() => ({
      data: ref(mockDiagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn(),
    }));

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

    useFetchMock.mockImplementation(() => ({
      data: ref(mockDiagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn(),
    }));

    const { html } = await renderSuspended(App);

    expect(html()).toMatchSnapshot();
  });

  it("shows loading spinner when pending", async () => {
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(true),
      error: ref(undefined),
      refresh: vi.fn(),
    }));

    const wrapper = await mountSuspended(App);

    // Check that loading state is shown - the component should render differently when pending
    expect(wrapper.html()).not.toContain("Extensions"); // Tabs should not be shown when pending
  });

  it("shows error alert when useFetch returns an error", async () => {
    const error = new Error("Failed to fetch diagnostics");
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(false),
      error: ref(error),
      refresh: vi.fn(),
    }));

    const wrapper = await mountSuspended(App);

    // Check that error state is shown - the component should show error message
    expect(wrapper.text()).toContain("Failed to fetch diagnostics");
    expect(wrapper.html()).not.toContain("Extensions"); // Tabs should not be shown when error
  });
});
