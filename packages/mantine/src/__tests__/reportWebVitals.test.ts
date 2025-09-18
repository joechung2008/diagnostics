import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import reportWebVitals from "../reportWebVitals";

describe("reportWebVitals", () => {
  const mockOnCLS = vi.fn();
  const mockOnINP = vi.fn();
  const mockOnFCP = vi.fn();
  const mockOnLCP = vi.fn();
  const mockOnTTFB = vi.fn();

  beforeEach(() => {
    vi.doMock("web-vitals", () => ({
      onCLS: mockOnCLS,
      onINP: mockOnINP,
      onFCP: mockOnFCP,
      onLCP: mockOnLCP,
      onTTFB: mockOnTTFB,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should call web-vitals functions when onPerfEntry is provided", async () => {
    const onPerfEntry = vi.fn();

    reportWebVitals(onPerfEntry);

    // Wait for the dynamic import and web-vitals functions to execute
    await new Promise(requestAnimationFrame);

    expect(mockOnCLS).toHaveBeenCalledWith(onPerfEntry);
    expect(mockOnINP).toHaveBeenCalledWith(onPerfEntry);
    expect(mockOnFCP).toHaveBeenCalledWith(onPerfEntry);
    expect(mockOnLCP).toHaveBeenCalledWith(onPerfEntry);
    expect(mockOnTTFB).toHaveBeenCalledWith(onPerfEntry);
  });

  it("should not call web-vitals functions when onPerfEntry is not provided", async () => {
    reportWebVitals();

    await new Promise(requestAnimationFrame);

    expect(mockOnCLS).not.toHaveBeenCalled();
    expect(mockOnINP).not.toHaveBeenCalled();
    expect(mockOnFCP).not.toHaveBeenCalled();
    expect(mockOnLCP).not.toHaveBeenCalled();
    expect(mockOnTTFB).not.toHaveBeenCalled();
  });
});
