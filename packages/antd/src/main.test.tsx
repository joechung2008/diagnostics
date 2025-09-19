import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from "vitest";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock("./reportWebVitals.ts", () => ({
  default: vi.fn(),
}));

vi.mock("web-vitals", () => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

vi.mock("./ThemedApp.tsx", () => ({
  __esModule: true,
  default: () => null,
}));

import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals.ts";

describe("main.tsx", () => {
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

  it("renders ThemedApp and calls reportWebVitals", async () => {
    const existing = document.getElementById("root");
    if (!existing) {
      const div = document.createElement("div");
      div.id = "root";
      document.body.appendChild(div);
    }

    vi.useFakeTimers();
    await import("./main.tsx");
    vi.runAllTimers();
    vi.useRealTimers();

    expect(createRoot).toHaveBeenCalled();
    // Check that render was called
    type MockRoot = { render: Mock };
    const root = (
      createRoot as unknown as { mock: { results: { value: MockRoot }[] } }
    ).mock.results[0].value;
    expect(root.render).toHaveBeenCalled();
    expect(reportWebVitals).toHaveBeenCalledWith(console.log);
  });
});
