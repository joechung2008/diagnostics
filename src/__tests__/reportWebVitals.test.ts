import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import reportWebVitals from "../reportWebVitals";

describe("reportWebVitals", () => {
  beforeEach(() => {
    vi.mock("web-vitals", () => ({
      onCLS: vi.fn(),
      onINP: vi.fn(),
      onFCP: vi.fn(),
      onLCP: vi.fn(),
      onTTFB: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("does nothing when onPerfEntry is not a function", async () => {
    // Import the mocked functions
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");

    reportWebVitals();

    await new Promise(requestAnimationFrame);

    expect(onCLS).not.toHaveBeenCalled();
    expect(onINP).not.toHaveBeenCalled();
    expect(onFCP).not.toHaveBeenCalled();
    expect(onLCP).not.toHaveBeenCalled();
    expect(onTTFB).not.toHaveBeenCalled();
  });

  it("calls web-vitals functions when onPerfEntry is a function", async () => {
    const mockOnPerfEntry = vi.fn();

    // Import the mocked functions
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");

    reportWebVitals(mockOnPerfEntry);

    await new Promise(requestAnimationFrame);

    expect(onCLS).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onINP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onFCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onLCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onTTFB).toHaveBeenCalledWith(mockOnPerfEntry);
  });
});
