import { describe, expect, it } from "vitest";
import Extension from "../Extension";
import { render } from "./test-utils";

describe("Extension", () => {
  it("renders correctly with all props", () => {
    const extensionInfo = {
      extensionName: "test-extension",
      config: { key: "value" },
      stageDefinition: { stage1: ["step1", "step2"] },
    };
    const { container } = render(<Extension {...extensionInfo} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly without config", () => {
    const extensionInfo = {
      extensionName: "test-extension",
      stageDefinition: { stage1: ["step1"] },
    };
    const { container } = render(<Extension {...extensionInfo} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly without stageDefinition", () => {
    const extensionInfo = {
      extensionName: "test-extension",
      config: { key: "value" },
    };
    const { container } = render(<Extension {...extensionInfo} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
