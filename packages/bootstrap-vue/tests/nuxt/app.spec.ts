import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { ref } from "vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import App from "../../app/app.vue";

describe("App", () => {
  const { useFetchMock } = vi.hoisted(() => ({
    useFetchMock: vi.fn()
  }));

  beforeEach(() => {
    // install the Nuxt import mock before each test
    mockNuxtImport("useFetch", () => useFetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading spinner when pending", async () => {
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(true),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);
    expect(wrapper.find(".spinner-border").exists()).toBe(true);
  });

  it("shows error when useFetch returns an error", async () => {
    const error = new Error("boom");
    useFetchMock.mockImplementation(() => ({
      data: ref(undefined),
      pending: ref(false),
      error: ref(error),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);
    expect(wrapper.find(".alert").exists()).toBe(true);
    expect(wrapper.text()).toContain("boom");
  });

  it("renders environment selector and buttons when loaded", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);
    expect(wrapper.html()).toContain("Select environment");
    expect(wrapper.html()).toContain("paasserverless");
    expect(wrapper.html()).toContain("websites");
  });

  it("renders tabs when data is loaded", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);
    expect(wrapper.html()).toContain("Extensions");
    expect(wrapper.html()).toContain("Build Information");
    expect(wrapper.html()).toContain("Server Information");
  });

  it("renders Build Information tab", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);

    // Check that the Build Information tab exists
    const buildTab = wrapper.find('[aria-controls="build-tab"]');
    expect(buildTab.exists()).toBe(true);
  });

  it("renders Server Information tab", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "deployment-123",
        extensionSync: { totalSyncAllCount: 5 },
        hostname: "server-host",
        serverId: "server-456"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);

    // Check that the Server Information tab exists
    const serverTab = wrapper.find('[aria-controls="server-tab"]');
    expect(serverTab.exists()).toBe(true);
  });

  it("selects paasserverless extension when paasserverless button is clicked", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: {
          extensionName: "paasserverless",
          config: { setting1: "value1" },
          stageDefinition: { s: [] }
        },
        websites: { extensionName: "websites", config: {}, stageDefinition: { s: [] } },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);

    // Find and click the paasserverless button
    const buttons = wrapper.findAll("button");
    const paasButtonElement = buttons.find((btn) => btn.text() === "paasserverless");
    await paasButtonElement?.trigger("click");

    // Check that we're on the extensions tab and paasserverless is selected
    expect(wrapper.find("#extensions-tab").exists()).toBe(true);
    expect(wrapper.html()).toContain("setting1");
  });

  it("selects websites extension when websites button is clicked", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        websites: {
          extensionName: "websites",
          config: { domain: "example.com" },
          stageDefinition: { s: [] }
        },
        ext1: { extensionName: "ext1", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);

    // Find and click the websites button
    const buttons = wrapper.findAll("button");
    const websitesButton = buttons.find((btn) => btn.text() === "websites");
    await websitesButton?.trigger("click");

    // Check that we're on the extensions tab and websites is selected
    expect(wrapper.find("#extensions-tab").exists()).toBe(true);
    expect(wrapper.html()).toContain("domain");
  });

  it("selects extension when clicked in extensions list", async () => {
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } },
        websites: { extensionName: "websites", config: {}, stageDefinition: { s: [] } },
        ext1: {
          extensionName: "ext1",
          config: { customSetting: "test" },
          stageDefinition: { s: [] }
        }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: vi.fn()
    }));

    const wrapper = await mountSuspended(App);

    // Find and click the ext1 extension link
    const links = wrapper.findAll("a");
    const ext1LinkElement = links.find((link) => link.text() === "ext1");
    await ext1LinkElement?.trigger("click");

    // Check that the extension details are displayed
    expect(wrapper.html()).toContain("customSetting");
  });

  it("refreshes data when Fairfax environment is selected", async () => {
    const refreshMock = vi.fn();
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: refreshMock
    }));

    const wrapper = await mountSuspended(App);

    // Find the environment selector and change to Fairfax
    const select = wrapper.find("select");
    await select.setValue("https://hosting.azureportal.usgovcloudapi.net/api/diagnostics");

    // Check that refresh was called
    expect(refreshMock).toHaveBeenCalled();
  });

  it("refreshes data when Mooncake environment is selected", async () => {
    const refreshMock = vi.fn();
    const diagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: { extensionName: "paasserverless", config: {}, stageDefinition: { s: [] } }
      },
      serverInfo: {
        deploymentId: "d",
        extensionSync: { totalSyncAllCount: 0 },
        hostname: "h",
        serverId: "s"
      }
    };

    useFetchMock.mockImplementation(() => ({
      data: ref(diagnostics),
      pending: ref(false),
      error: ref(undefined),
      refresh: refreshMock
    }));

    const wrapper = await mountSuspended(App);

    // Find the environment selector and change to Mooncake
    const select = wrapper.find("select");
    await select.setValue("https://hosting.azureportal.chinacloudapi.cn/api/diagnostics");

    // Check that refresh was called
    expect(refreshMock).toHaveBeenCalled();
  });
});
