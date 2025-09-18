import { describe, expect, it } from "vitest";
import Extension from "../Extension";
import { render } from "./test-utils";

describe("Extension", () => {
  it("should render the extension name", () => {
    const props: ExtensionInfo = { extensionName: "test" };
    const { container } = render(<Extension {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render Configuration if config is provided", () => {
    const props: ExtensionInfo = {
      extensionName: "test",
      config: { key: "value" },
    };
    const { container } = render(<Extension {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render StageDefinition if stageDefinition is provided", () => {
    const props: ExtensionInfo = {
      extensionName: "test",
      stageDefinition: { stage: ["step1"] },
    };
    const { container } = render(<Extension {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
