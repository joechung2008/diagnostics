import * as solidWeb from "solid-js/web";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import reportWebVitals from "../reportWebVitals";

vi.mock("solid-js/web");
vi.mock("../reportWebVitals");

describe("index.tsx", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
    vi.resetModules();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("renders ThemedApp to root element", async () => {
    const renderSpy = vi.spyOn(solidWeb, "render");
    await import("../index");
    expect(renderSpy).toHaveBeenCalled();
    expect(document.getElementById("root")).not.toBeNull();
    // Check that render was called with a function and the root element
    const [[renderFn, renderRoot]] = renderSpy.mock.calls;
    expect(typeof renderFn).toBe("function");
    expect(renderRoot).toBe(document.getElementById("root"));
  });

  it("calls reportWebVitals with console.log", async () => {
    await import("../index");
    expect(reportWebVitals).toHaveBeenCalledWith(console.log);
  });
});
