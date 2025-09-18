import { render, screen } from "@testing-library/react";
import { theme } from "antd";
import type { AliasToken } from "antd/es/theme/interface";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemedApp from "./ThemedApp";

vi.mock("./App", () => ({
  __esModule: true,
  default: () => <div data-testid="app-child">App</div>,
}));

describe("ThemedApp", () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;
  let addEventListener: ReturnType<typeof vi.fn>;
  let removeEventListener: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addEventListener = vi.fn();
    removeEventListener = vi.fn();
    matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      addEventListener,
      removeEventListener,
    }));
    window.matchMedia = matchMediaMock;
    vi.spyOn(document.body.style, "background", "set");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders App as child", () => {
    render(<ThemedApp />);
    expect(screen.getByTestId("app-child")).toBeInTheDocument();
  });

  it("uses darkAlgorithm when dark mode", () => {
    render(<ThemedApp />);
    expect(matchMediaMock).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });

  it("sets background color from theme token", () => {
    const color = "#123456";
    vi.spyOn(theme, "getDesignToken").mockReturnValue({
      colorBgBase: color,
    } as unknown as AliasToken);
    render(<ThemedApp />);
    // Browsers normalize colors to rgb format, so compare accordingly
    expect(document.body.style.background).toBe("rgb(18, 52, 86)");
  });

  it("responds to color scheme changes", () => {
    render(<ThemedApp />);
    expect(addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
