import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

// Mock useSWR
const mockUseSWR = vi.fn();
vi.doMock("swr", () => ({
  default: mockUseSWR,
}));

// Mock window.matchMedia for useSystemTheme hook
const mockMatchMedia = vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

describe("App", () => {
  it("matches snapshot", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows loading spinner when loading", () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows error alert when error occurs", () => {
    const error = new Error("Network error");
    mockUseSWR.mockReturnValue({
      data: undefined,
      error,
      isLoading: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows content when loaded", () => {
    const mockDiagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {},
      serverInfo: { serverVersion: "1.0.0" },
    };
    mockUseSWR.mockReturnValue({
      data: mockDiagnostics,
      error: undefined,
      isLoading: false,
    });
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
