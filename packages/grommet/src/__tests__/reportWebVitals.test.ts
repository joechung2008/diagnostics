import { describe, it, expect, vi, beforeEach } from "vitest";
import reportWebVitals from "../reportWebVitals";

const onCLS = vi.fn();
const onFCP = vi.fn();
const onINP = vi.fn();
const onLCP = vi.fn();
const onTTFB = vi.fn();

vi.mock("web-vitals", () => ({
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
}));

describe("reportWebVitals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does nothing if argument is not a function", async () => {
    reportWebVitals();

    // Wait for the dynamic `web-vitals` import to resolve.
    await new Promise(requestAnimationFrame);

    expect(onCLS).not.toHaveBeenCalled();
    expect(onFCP).not.toHaveBeenCalled();
    expect(onINP).not.toHaveBeenCalled();
    expect(onLCP).not.toHaveBeenCalled();
    expect(onTTFB).not.toHaveBeenCalled();
  });

  it("calls web-vitals handlers when a function is provided", async () => {
    const onPerfEntry = vi.fn();

    reportWebVitals(onPerfEntry);

    // Wait for the dynamic `web-vitals` import to resolve.
    await new Promise(requestAnimationFrame);

    expect(onCLS).toHaveBeenCalledWith(onPerfEntry);
    expect(onFCP).toHaveBeenCalledWith(onPerfEntry);
    expect(onINP).toHaveBeenCalledWith(onPerfEntry);
    expect(onLCP).toHaveBeenCalledWith(onPerfEntry);
    expect(onTTFB).toHaveBeenCalledWith(onPerfEntry);
  });
});
