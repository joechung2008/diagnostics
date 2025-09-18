import { render } from "@solidjs/testing-library";
import { findByText, findAllByText } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeAll, afterEach } from "vitest";
import App from "../App";

let originalFetch: typeof global.fetch;

describe("App", () => {
  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("renders environment and tab buttons", () => {
    const { getByRole } = render(() => <App />);
    expect(getByRole("button", { name: "Public Cloud" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Extensions" })).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Build Information" })
    ).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Server Information" })
    ).toBeInTheDocument();
  });

  it("allows selecting environment from menu", async () => {
    const { getByText } = render(() => <App />);
    const envButton = getByText("Public Cloud");
    await userEvent.click(envButton);

    // Use @testing-library/dom's findByText instead of render's, because
    // the menu renders outside the App's stacking context.
    const fairfaxItem = await findByText(document.body, "Fairfax");
    const mooncakeItem = await findByText(document.body, "Mooncake");

    expect(fairfaxItem).toBeInTheDocument();
    expect(mooncakeItem).toBeInTheDocument();

    // Select Fairfax
    await userEvent.click(fairfaxItem);

    // Fairfax should now be selected as the button text
    expect(getByText("Fairfax")).toBeInTheDocument();
  });

  it("selects Public Cloud from environment menu", async () => {
    const { getByText } = render(() => <App />);

    // Switch to Fairfax first
    const envButton = getByText("Public Cloud");
    await userEvent.click(envButton);
    const fairfaxItem = await findByText(document.body, "Fairfax");
    await userEvent.click(fairfaxItem);
    expect(getByText("Fairfax")).toBeInTheDocument();

    // Open menu and select Public Cloud
    const envButtonFairfax = getByText("Fairfax");
    await userEvent.click(envButtonFairfax);
    const publicCloudItem = await findByText(document.body, "Public Cloud");
    await userEvent.click(publicCloudItem);
    expect(getByText("Public Cloud")).toBeInTheDocument();
  });

  it("selects Mooncake from environment menu", async () => {
    const { getByText } = render(() => <App />);
    const envButton = getByText("Public Cloud");
    await userEvent.click(envButton);
    const mooncakeItem = await findByText(document.body, "Mooncake");
    await userEvent.click(mooncakeItem);
    expect(getByText("Mooncake")).toBeInTheDocument();
  });

  it("shows paasserverless button when extension is present", async () => {
    // Mock fetch to return diagnostics with paasserverless extension
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: {},
          serverInfo: {},
        }),
      }) as Response;

    const { findAllByRole } = render(() => <App />);
    // Wait for all buttons named "paasserverless"
    const buttons = await findAllByRole("button", { name: "paasserverless" });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("shows extension details when extension link is clicked", async () => {
    // Mock fetch to return diagnostics with multiple extensions
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            websites: {
              extensionName: "websites",
              config: { apiUrl: "https://example.com" },
              stageDefinition: { deploy: ["build", "release"] },
            },
            functions: {
              extensionName: "functions",
              config: { apiUrl: "https://functions.example.com" },
              stageDefinition: { deploy: ["build", "release"] },
            },
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: {},
          serverInfo: {},
        }),
      }) as Response;

    const { findByRole } = render(() => <App />);
    // Wait for the extension link to appear and click it
    const extButton = await findByRole("button", { name: "websites" });
    await userEvent.click(extButton);

    // Extension details should be shown (e.g., extensionName)
    const allWebsites = await findAllByText(document.body, "websites");
    expect(allWebsites.some((el) => el.tagName === "H1")).toBe(true);
  });

  it("shows paasserverless details when paasserverless button is clicked", async () => {
    // Mock fetch to return diagnostics with paasserverless and websites extensions
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            websites: {
              extensionName: "websites",
              config: { apiUrl: "https://example.com" },
              stageDefinition: { deploy: ["build", "release"] },
            },
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: {},
          serverInfo: {},
        }),
      }) as Response;

    const { findAllByRole } = render(() => <App />);
    const paasButtons = await findAllByRole("button", {
      name: "paasserverless",
    });
    // Click the extension navigation link (button with child span containing "paasserverless")
    const navButton = paasButtons.find((btn) =>
      Array.from(btn.querySelectorAll("span")).some(
        (span) => span.textContent === "paasserverless"
      )
    );
    await userEvent.click(navButton!);

    const allPaas = await findAllByText(document.body, "paasserverless");
    expect(allPaas.some((el) => el.tagName === "H1")).toBe(true);
  });

  it("shows paasserverless details when paasserverless menu item is clicked", async () => {
    // Mock fetch to return diagnostics with paasserverless extension
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: {},
          serverInfo: {},
        }),
      }) as Response;

    const { findAllByRole } = render(() => <App />);
    const paasMenuButtons = await findAllByRole("button", {
      name: "paasserverless",
    });
    await userEvent.click(paasMenuButtons[0]); // toolbar button

    const allPaas = await findAllByText(document.body, "paasserverless");
    expect(allPaas.some((el) => el.tagName === "H1")).toBe(true);
  });

  it("shows websites details when websites button is clicked", async () => {
    // Mock fetch to return diagnostics with paasserverless and websites extensions
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            websites: {
              extensionName: "websites",
              config: { apiUrl: "https://example.com" },
              stageDefinition: { deploy: ["build", "release"] },
            },
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: { build: "123", date: "2025-08-16" },
          serverInfo: { server: "test-server" },
        }),
      }) as Response;

    const { findByRole } = render(() => <App />);
    const websitesButton = await findByRole("button", { name: "websites" });
    await userEvent.click(websitesButton);

    const allWebsites = await findAllByText(document.body, "websites");
    expect(allWebsites.some((el) => el.tagName === "H1")).toBe(true);
  });

  it("shows Build Information when Build Information button is clicked", async () => {
    // Mock fetch to return diagnostics with buildInfo
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {},
          buildInfo: { buildVersion: "123", date: "2025-08-16" },
          serverInfo: { server: "test-server" },
        }),
      }) as Response;

    const { getByText, getAllByText } = render(() => <App />);
    const buildButton = getByText("Build Information");
    await userEvent.click(buildButton);

    // Check for build info content
    expect(getByText("Build Information")).toBeInTheDocument();
    const buildCells = getAllByText("123");
    expect(buildCells.some((el) => el.tagName === "TD")).toBe(true);
  });

  it("shows Server Information when Server Information button is clicked", async () => {
    // Mock fetch to return diagnostics with serverInfo
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {},
          buildInfo: { build: "123", date: "2025-08-16" },
          serverInfo: {
            server: "test-server",
            extensionSync: {
              totalSyncAllCount: 5,
              totalSyncSuccessCount: 5,
              totalSyncErrorCount: 0,
              totalSyncWarningCount: 0,
            },
          },
        }),
      }) as Response;

    const { getByText } = render(() => <App />);
    const serverButton = getByText("Server Information");
    await userEvent.click(serverButton);

    // Check for server info content
    expect(getByText("Server Information")).toBeInTheDocument();
    expect(getByText("Server Info")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("shows Extensions tab and extension links when Extensions button is clicked", async () => {
    // Mock fetch to return diagnostics with extensions
    global.fetch = async () =>
      ({
        json: async () => ({
          extensions: {
            websites: {
              extensionName: "websites",
              config: { apiUrl: "https://example.com" },
              stageDefinition: { deploy: ["build", "release"] },
            },
            paasserverless: {
              extensionName: "paasserverless",
              config: {},
              stageDefinition: { deploy: ["build", "release"] },
            },
          },
          buildInfo: {},
          serverInfo: {},
        }),
      }) as Response;

    const { getByText, getAllByText } = render(() => <App />);
    const extensionsButton = getByText("Extensions");
    await userEvent.click(extensionsButton);

    // Check for extension links
    const websitesLinks = getAllByText("websites");
    expect(websitesLinks.some((el) => el.tagName === "BUTTON")).toBe(true);
    const paasLinks = getAllByText("paasserverless");
    expect(paasLinks.some((el) => el.tagName === "BUTTON")).toBe(true);
  });
});
