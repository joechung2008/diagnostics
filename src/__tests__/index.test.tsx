import { beforeEach, describe, expect, it, vi } from "vitest";

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({
  render: renderMock,
}));

vi.mock("react-dom/client", () => ({
  createRoot: createRootMock,
}));

const reportWebVitalsMock = vi.fn();
vi.mock("../reportWebVitals", () => ({
  __esModule: true,
  default: reportWebVitalsMock,
}));

// Mock the real App to avoid running its async logic (fetch/Suspense) during
// module import. This keeps the test deterministic and fast.
vi.mock("../App", () => ({
  __esModule: true,
  default: () => null,
}));

describe("index.tsx", () => {
  beforeEach(() => {
    vi.resetModules();
    createRootMock.mockClear();
    renderMock.mockClear();
    reportWebVitalsMock.mockClear();
    vi.restoreAllMocks();
    const container = document.createElement("div");
    vi.spyOn(document, "getElementById").mockReturnValue(container);
  });

  it("renders App without crashing", async () => {
    await import("../index");
    expect(createRootMock).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalled();
  });

  it("calls reportWebVitals", async () => {
    await import("../index");
    expect(reportWebVitalsMock).toHaveBeenCalledWith(console.log);
  });
});
