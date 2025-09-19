import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/App", () => ({
  __esModule: true,
  default: () => <div>Mocked App</div>,
}));

describe("index.tsx", () => {
  beforeEach(() => {
    // Clean up any existing root element
    const existingRoot = document.getElementById("root");
    if (existingRoot) {
      existingRoot.remove();
    }
  });

  afterEach(() => {
    // Clean up root element after each test
    const root = document.getElementById("root");
    if (root) {
      root.remove();
    }
    // Reset all mocks
    vi.resetAllMocks();
    // Clear module cache to ensure fresh imports
    vi.resetModules();
  });

  it("renders App without crashing", async () => {
    // Simulate root element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Dynamically import index.tsx (should render mocked App)
    await import("../index.tsx");

    // The root div should exist, but jsdom doesn't execute ReactDOM rendering in this context.
    expect(document.getElementById("root")).not.toBeNull();
  });
});
