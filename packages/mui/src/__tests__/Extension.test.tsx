import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extension from "../Extension";

describe("Extension", () => {
  it("renders extensionName as heading", () => {
    const { container } = render(<Extension extensionName="TestExt" />);
    expect(container).toMatchSnapshot();
  });

  it("renders Configuration when config is provided", () => {
    const config = { foo: "bar" };
    const { container } = render(
      <Extension extensionName="ext" config={config} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders StageDefinition when stageDefinition is provided", () => {
    const stageDefinition = { name: ["Stage1"] };
    const { container } = render(
      <Extension extensionName="ext" stageDefinition={stageDefinition} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders both Configuration and StageDefinition when both props are provided", () => {
    const config = { foo: "bar" };
    const stageDefinition = { name: ["Stage1"] };
    const { container } = render(
      <Extension
        extensionName="ext"
        config={config}
        stageDefinition={stageDefinition}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot", () => {
    const { container } = render(<Extension extensionName="ext" />);
    expect(container).toMatchSnapshot();
  });
});
