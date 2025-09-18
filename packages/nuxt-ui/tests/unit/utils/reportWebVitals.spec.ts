import { beforeEach, describe, expect, it, vi } from "vitest";
import reportWebVitals from "../../../app/utils/reportWebVitals";

// Mock web-vitals module
const mockOnCLS = vi.fn();
const mockOnINP = vi.fn();
const mockOnFCP = vi.fn();
const mockOnLCP = vi.fn();
const mockOnTTFB = vi.fn();

vi.mock("web-vitals", () => ({
  onCLS: mockOnCLS,
  onINP: mockOnINP,
  onFCP: mockOnFCP,
  onLCP: mockOnLCP,
  onTTFB: mockOnTTFB,
}));

describe("app/utils/reportWebVitals", () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when no handler is provided", () => {
    it("should do nothing", () => {
      reportWebVitals();

      expect(mockOnCLS).not.toHaveBeenCalled();
      expect(mockOnINP).not.toHaveBeenCalled();
      expect(mockOnFCP).not.toHaveBeenCalled();
      expect(mockOnLCP).not.toHaveBeenCalled();
      expect(mockOnTTFB).not.toHaveBeenCalled();
    });
  });

  describe("when handler is a valid function", () => {
    it("should import web-vitals and register all metrics handlers", async () => {
      reportWebVitals(mockHandler);

      // Wait for the dynamic import to complete
      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalledWith(mockHandler);
        expect(mockOnINP).toHaveBeenCalledWith(mockHandler);
        expect(mockOnFCP).toHaveBeenCalledWith(mockHandler);
        expect(mockOnLCP).toHaveBeenCalledWith(mockHandler);
        expect(mockOnTTFB).toHaveBeenCalledWith(mockHandler);
      });
    });

    it("should register all handlers exactly once", async () => {
      reportWebVitals(mockHandler);

      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalledTimes(1);
        expect(mockOnINP).toHaveBeenCalledTimes(1);
        expect(mockOnFCP).toHaveBeenCalledTimes(1);
        expect(mockOnLCP).toHaveBeenCalledTimes(1);
        expect(mockOnTTFB).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle multiple calls independently", async () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      reportWebVitals(handler1);
      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalledWith(handler1);
      });
      reportWebVitals(handler2);
      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalledWith(handler2);
        expect(mockOnINP).toHaveBeenCalledWith(handler2);
      });
    });

    it("should work with arrow functions", async () => {
      const arrowHandler = vi.fn();

      reportWebVitals(arrowHandler);

      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalledWith(arrowHandler);
        expect(mockOnFCP).toHaveBeenCalledWith(arrowHandler);
      });
    });

    it("should work with anonymous functions", async () => {
      reportWebVitals(() => {});

      await vi.waitFor(() => {
        expect(mockOnCLS).toHaveBeenCalled();
        expect(mockOnTTFB).toHaveBeenCalled();
      });
    });
  });
});
