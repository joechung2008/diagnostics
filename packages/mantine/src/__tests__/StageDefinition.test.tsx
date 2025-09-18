import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";
import { render } from "./test-utils";

describe("StageDefinition", () => {
  it("should render the stage definition in a table", () => {
    const stageDefinition = { stage1: ["step1", "step2"], stage2: ["step3"] };
    const { container } = render(
      <StageDefinition stageDefinition={stageDefinition} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
