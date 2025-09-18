import * as ReactDOM from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import reportWebVitals from "../reportWebVitals";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock("../reportWebVitals", () => ({
  default: vi.fn(),
}));

describe("index.tsx", () => {
  it("renders without crashing", async () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);

    await import("../index.tsx");
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(root);
    document.body.removeChild(root);
  });

  it("calls reportWebVitals", async () => {
    await import("../index.tsx");
    expect(reportWebVitals).toHaveBeenCalled();
  });
});
