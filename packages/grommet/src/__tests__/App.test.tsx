import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import App from "../App";

vi.mock("../BuildInfo", () => ({
  default: () => <div data-testid="build-info" />,
}));

vi.mock("../Extension", () => ({
  default: () => <div data-testid="extension" />,
}));

vi.mock("../Extensions", () => ({
  default: ({ onLinkClick }: ExtensionsProps) => (
    <div data-testid="extensions">
      <button
        type="button"
        onClick={() => {
          onLinkClick(undefined, { name: "websites", key: "websites" });
        }}
      >
        Websites
      </button>
      <button
        type="button"
        onClick={() => {
          onLinkClick(undefined, {
            name: "paasserverless",
            key: "paasserverless",
          });
        }}
      >
        paasserverless
      </button>
      <button
        type="button"
        onClick={() => {
          onLinkClick(undefined, { name: "websites", key: "websites" });
        }}
      >
        websites
      </button>
      <div data-testid="extension" />
    </div>
  ),
}));

vi.mock("../ServerInfo", () => ({
  default: () => <div data-testid="server-info" />,
}));

const mockDiagnostics = {
  buildInfo: {},
  extensions: {
    websites: { name: "Websites" },
    paasserverless: { name: "PaaS Serverless" },
  },
  serverInfo: {},
};

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(mockDiagnostics),
  });
  global.scrollTo = vi.fn();
});

describe("App", () => {
  it("renders nothing while loading", () => {
    // Simulate fetch not resolved yet
    (global.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockImplementation(() => new Promise(() => {})),
    });
    render(<App />);
    expect(screen.queryByTestId("build-info")).toBeNull();
    expect(screen.queryByTestId("extensions")).toBeNull();
    expect(screen.queryByTestId("server-info")).toBeNull();
  });

  it("renders Extensions tab by default", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    expect(screen.queryByTestId("build-info")).toBeNull();
    expect(screen.queryByTestId("server-info")).toBeNull();
  });

  it("switches to Build Information tab", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByTestId("build-info")).toBeInTheDocument();
  });

  it("switches to Server Information tab", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Server Information"));
    expect(screen.getByTestId("server-info")).toBeInTheDocument();
  });

  it("changes environment", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    // Open the environment menu
    fireEvent.click(screen.getByLabelText("Open Menu"));
    fireEvent.click(
      screen
        .getAllByText("Public Cloud")
        .find((el) => el.closest('[role="menuitem"]'))!
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hosting.portal.azure.net/api/diagnostics"
    );
    fireEvent.click(screen.getByLabelText("Open Menu"));
    fireEvent.click(
      screen
        .getAllByText("Fairfax")
        .find((el) => el.closest('[role="menuitem"]'))!
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
    );
    fireEvent.click(screen.getByLabelText("Open Menu"));
    fireEvent.click(
      screen
        .getAllByText("Mooncake")
        .find((el) => el.closest('[role="menuitem"]'))!
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics"
    );
  });

  it("selects extension via Extensions component", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Websites"));
    expect(screen.getByTestId("extension")).toBeInTheDocument();
  });

  it("shows paasserverless button and selects it", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("paasserverless"));
    expect(screen.getByTestId("extension")).toBeInTheDocument();
  });

  it("shows websites button and selects it", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByTestId("extensions")).toBeInTheDocument()
    );
    fireEvent.click(screen.getAllByText("websites")[0]);
    expect(screen.getByTestId("extension")).toBeInTheDocument();
  });
});
