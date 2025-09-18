import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let renderMock: ReturnType<typeof vi.fn>;

vi.mock("react-dom/client", () => ({
  createRoot: () => ({ render: () => renderMock() }),
}));

describe("main entry point", () => {
  beforeEach(() => {
    renderMock = vi.fn();
    // Remove any existing root element
    const existingRoot = document.getElementById("root");
    if (existingRoot) {
      existingRoot.remove();
    }
    // Mock document.getElementById and createRoot
    const rootElem = document.createElement("div");
    rootElem.id = "root";
    document.body.appendChild(rootElem);

    vi.stubGlobal("document", {
      ...document,
      getElementById: vi.fn(() => rootElem),
      querySelector: vi.fn(() => null),
      querySelectorAll: vi.fn(() => []),
      createElement: document.createElement.bind(document),
    });
  });

  afterEach(() => {
    const rootElem = document.getElementById("root");
    if (rootElem) {
      rootElem.remove();
    }
  });

  it("renders without crashing", async () => {
    // Import main.tsx after mocks are set up
    await import("../main.tsx");
    expect(renderMock).toHaveBeenCalled();
  });
});
