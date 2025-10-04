import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import ThemedApp from "../ThemedApp";
import { useSystemTheme } from "../useSystemTheme";

vi.mock("../App");
vi.mock("../useSystemTheme");

describe("ThemedApp", () => {
  const mockUseSystemTheme = vi.mocked(useSystemTheme);
  const mockApp = vi.mocked(App);

  it("passes 'bp6-dark' className to App when theme is dark", () => {
    mockUseSystemTheme.mockReturnValue("dark");

    render(<ThemedApp />);

    expect(mockApp).toHaveBeenCalledWith({ className: "bp6-dark" }, {});
  });

  it("passes undefined className to App when theme is light", () => {
    mockUseSystemTheme.mockReturnValue("light");

    render(<ThemedApp />);

    expect(mockApp).toHaveBeenCalledWith({ className: undefined }, {});
  });
});
