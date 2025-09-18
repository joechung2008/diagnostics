import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import React from "react";
import App from "../App";

describe("index.tsx", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  beforeEach(() => {
    vi.mock("react-dom/client", () => ({
      createRoot: vi.fn(() => ({
        render: vi.fn(),
      })),
    }));

    vi.mock("../App", () => ({
      default: vi.fn(() => <div>Mock App</div>),
    }));

    vi.mock("../reportWebVitals", () => ({
      default: vi.fn(),
    }));
  });

  it("renders the app with Provider and StrictMode", async () => {
    await import("../index");

    const mockCreateRoot = vi.mocked(createRoot);
    const mockRoot = mockCreateRoot.mock.results[0].value;
    const mockRender = mockRoot.render;

    expect(mockCreateRoot).toHaveBeenCalledWith(
      document.getElementById("root")
    );

    expect(mockRender).toHaveBeenCalledTimes(1);

    const renderCall = mockRender.mock.calls[0][0];
    expect(renderCall.type).toBe(React.StrictMode);

    const providerElement = renderCall.props.children;
    expect(providerElement.type).toBe(Provider);
    expect(providerElement.props.theme).toBe(defaultTheme);

    const appElement = providerElement.props.children;
    expect(appElement.type).toBe(App);
  });
});
