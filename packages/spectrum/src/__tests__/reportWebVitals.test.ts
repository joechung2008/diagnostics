import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import reportWebVitals from "../reportWebVitals";

describe("reportWebVitals", () => {
  const mockOnPerfEntry = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  beforeEach(() => {
    vi.mock("web-vitals", () => ({
      onCLS: vi.fn(),
      onINP: vi.fn(),
      onFCP: vi.fn(),
      onLCP: vi.fn(),
      onTTFB: vi.fn(),
    }));
  });

  it("does nothing when onPerfEntry is not provided", async () => {
    reportWebVitals();

    await new Promise(requestAnimationFrame);

    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");
    expect(onCLS).not.toHaveBeenCalled();
    expect(onINP).not.toHaveBeenCalled();
    expect(onFCP).not.toHaveBeenCalled();
    expect(onLCP).not.toHaveBeenCalled();
    expect(onTTFB).not.toHaveBeenCalled();
  });

  it("calls all web-vitals functions when onPerfEntry is a function", async () => {
    reportWebVitals(mockOnPerfEntry);

    await new Promise(requestAnimationFrame);

    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");
    expect(onCLS).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onINP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onFCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onLCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(onTTFB).toHaveBeenCalledWith(mockOnPerfEntry);
  });
});
