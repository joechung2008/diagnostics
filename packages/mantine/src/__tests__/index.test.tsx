import { describe, it, expect, vi } from "vitest";

// Mock react-dom/client

const mockRender = vi.fn();

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: mockRender,
  })),
}));

// Mock reportWebVitals

const mockReportWebVitals = vi.fn();

vi.mock("../reportWebVitals", () => ({
  default: mockReportWebVitals,
}));

describe("index", () => {
  it("should render the app and call reportWebVitals", async () => {
    // Import index to execute it
    await import("../index");

    expect(mockRender).toHaveBeenCalled();
    expect(mockReportWebVitals).toHaveBeenCalledWith(console.log);
  });
});
