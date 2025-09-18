import { render, screen, fireEvent } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

const PUBLIC = "https://hosting.portal.azure.net/api/diagnostics";
const FAIRFAX = "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics";
const MOONCAKE = "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics";

const baseDiagnostics: Diagnostics = {
  buildInfo: { buildVersion: "1.0.0" },
  extensions: {
    websites: {
      extensionName: "websites"
    },
    paasserverless: {
      extensionName: "paasserverless"
    }
  },
  serverInfo: {
    deploymentId: "dep-1",
    extensionSync: { totalSyncAllCount: 99 },
    hostname: "host-1",
    nodeVersions: "v20.12.0",
    serverId: "srv-1",
    uptime: 1234
  }
};

const diagnosticsByEnv: Record<string, Diagnostics> = {
  [PUBLIC]: {
    ...baseDiagnostics,
    buildInfo: { buildVersion: "1.0.0" }
  },
  [FAIRFAX]: {
    ...baseDiagnostics,
    buildInfo: { buildVersion: "2.0.0" }
  },
  [MOONCAKE]: {
    ...baseDiagnostics,
    buildInfo: { buildVersion: "3.0.0" }
  }
};

const testMocks = vi.hoisted(() => ({
  fetchDiagnosticsMock: vi.fn<(env: string) => Promise<Diagnostics>>()
}));

// Test-controlled svelte-query mock utilities
type QueryMockState<T = unknown> = {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

function mockQueryStore<T>(getValue: () => QueryMockState<T>) {
  return {
    subscribe(run: (val: QueryMockState<T>) => void) {
      run(getValue());
      return () => {};
    }
  };
}

let queryMockValue: QueryMockState<Diagnostics> = {
  data: undefined,
  isLoading: false,
  error: undefined,
  refetch: () => {}
};

// Keep the real utils except for fetchDiagnostics
vi.mock("$lib/utils", async () => {
  const actual = await vi.importActual<typeof import("$lib/utils")>("$lib/utils");
  return {
    ...actual,
    fetchDiagnostics: testMocks.fetchDiagnosticsMock
  };
});

vi.mock("@/lib/utils", async () => {
  const actual = await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return {
    ...actual,
    fetchDiagnostics: testMocks.fetchDiagnosticsMock
  };
});

// Mock svelte-query's createQuery with a small, controllable store used in tests.
vi.mock("@tanstack/svelte-query", () => ({
  createQuery: () => mockQueryStore(() => queryMockValue)
}));

// Stub only DarkMode from flowbite-svelte to avoid window.matchMedia usage in client scripts
vi.mock("flowbite-svelte", async () => {
  const actual = await vi.importActual<typeof import("flowbite-svelte")>("flowbite-svelte");
  // Provide a function component that returns a DOM node (Svelte 5 calls components without 'new')
  const DarkMode = () => {
    const el = document.createElement("div");
    el.setAttribute("data-stub", "DarkMode");
    return el;
  };
  return { ...actual, DarkMode };
});

import Page from "@/routes/+page.svelte";

describe("+page.svelte", () => {
  beforeEach(() => {
    testMocks.fetchDiagnosticsMock.mockReset();
    testMocks.fetchDiagnosticsMock.mockImplementation(async (env: string) => diagnosticsByEnv[env]);
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    // Initialize the svelte-query mock to return Public environment diagnostics by default
    queryMockValue = {
      data: diagnosticsByEnv[PUBLIC],
      isLoading: false,
      error: undefined,
      refetch: () => {}
    };
  });

  it("loads diagnostics and shows default environment name", async () => {
    render(Page);

    // Initial fetch for Public environment

    // Environment name should show Public Cloud
    expect(await screen.findByText("Public Cloud")).toBeInTheDocument();

    // Tabs should render; verify Extensions tab content appears (sidebar label)
    expect(screen.getByText("Extensions")).toBeInTheDocument();
  });

  it("renders extension nav items", async () => {
    render(Page);

    // Wait for initial data
    await screen.findByText("Public Cloud");

    // Conditional nav item should exist (may appear in both navbar and sidebar)
    expect(screen.getAllByText("paasserverless").length).toBeGreaterThan(0);
    expect(screen.getAllByText("websites").length).toBeGreaterThan(0);
  });

  it("renders tab titles", async () => {
    render(Page);

    await screen.findByText("Public Cloud");

    expect(screen.getByText("Extensions")).toBeInTheDocument();
    expect(screen.getByText("Build Information")).toBeInTheDocument();
    expect(screen.getByText("Server Information")).toBeInTheDocument();
  });

  it("selects websites in navbar and shows its Extension details", async () => {
    render(Page);
    await screen.findByText("Public Cloud");

    // Click the navbar 'websites' item
    await fireEvent.click(screen.getAllByText("websites")[0]);

    // Extension component heading should show the selected extension name (h1)
    expect(await screen.findByRole("heading", { name: "websites" })).toBeInTheDocument();
  });

  it("selects paasserverless in navbar and shows its Extension details (when available)", async () => {
    render(Page);
    await screen.findByText("Public Cloud");

    const items = screen.getAllByText("paasserverless");
    expect(items.length).toBeGreaterThan(0);

    await fireEvent.click(items[0]);

    expect(await screen.findByRole("heading", { name: "paasserverless" })).toBeInTheDocument();
  });

  it("clicks an extension in the sidebar and shows its Extension details", async () => {
    render(Page);
    await screen.findByText("Public Cloud");

    // 'websites' appears in navbar and sidebar; click the last occurrence to prefer sidebar
    const links = screen.getAllByText("websites");
    await fireEvent.click(links[links.length - 1]);

    expect(await screen.findByRole("heading", { name: "websites" })).toBeInTheDocument();
  });

  it("does not render paasserverless nav when extension is absent", async () => {
    // For this test, return diagnostics without paasserverless
    testMocks.fetchDiagnosticsMock.mockReset();
    testMocks.fetchDiagnosticsMock.mockImplementation(async () => ({
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        websites: {
          extensionName: "websites",
          config: undefined,
          stageDefinition: undefined
        }
      },
      serverInfo: {
        deploymentId: "dep-1",
        extensionSync: { totalSyncAllCount: 99 },
        hostname: "host-1",
        nodeVersions: "v20.12.0",
        serverId: "srv-1",
        uptime: 1234
      }
    }));

    // Also update the mocked query store value so the component sees the same data
    queryMockValue = {
      data: {
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {
          websites: {
            extensionName: "websites",
            config: undefined,
            stageDefinition: undefined
          }
        },
        serverInfo: {
          deploymentId: "dep-1",
          extensionSync: { totalSyncAllCount: 99 },
          hostname: "host-1",
          nodeVersions: "v20.12.0",
          serverId: "srv-1",
          uptime: 1234
        }
      },
      isLoading: false,
      error: undefined,
      refetch: () => {}
    };

    render(Page);
    await screen.findByText("Public Cloud");

    // paasserverless should not appear anywhere in the DOM
    expect(screen.queryAllByText("paasserverless").length).toBe(0);
  });

  it("navigates between tabs and shows Build and Server info content", async () => {
    render(Page);
    await screen.findByText("Public Cloud");

    // Build tab
    await fireEvent.click(screen.getByText("Build Information"));
    expect(await screen.findByText("Build Version")).toBeInTheDocument();
    expect(screen.getByText("1.0.0")).toBeInTheDocument();

    // Server tab
    await fireEvent.click(screen.getByText("Server Information"));
    expect(await screen.findByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("host-1")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("calls refetch on mount", async () => {
    const refetchSpy = vi.fn();
    queryMockValue.refetch = refetchSpy;

    render(Page);
    // wait for a reliable sidebar item to appear so component has mounted
    const websiteItems = await screen.findAllByText("websites");
    expect(websiteItems.length).toBeGreaterThan(0);

    // onMount should call $query.refetch()
    expect(refetchSpy).toHaveBeenCalled();
  });

  it("renders paasserverless nav and clicking navbar instance shows Extension details", async () => {
    render(Page);
    // wait for the sidebar nav item
    const items = await screen.findAllByText("paasserverless");
    expect(items.length).toBeGreaterThan(0);

    // click the last occurrence (sidebar) to mimic user selection
    await fireEvent.click(items[items.length - 1]);

    expect(await screen.findByRole("heading", { name: "paasserverless" })).toBeInTheDocument();
  });
});
