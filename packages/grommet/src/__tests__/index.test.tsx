import * as ReactDOM from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import reportWebVitals from "../reportWebVitals";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock("../reportWebVitals", () => ({
  default: vi.fn(),
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

  it("renders without crashing", async () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);

    await import("../index.tsx");
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(root);
  });

  it("calls reportWebVitals", async () => {
    await import("../index.tsx");
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
