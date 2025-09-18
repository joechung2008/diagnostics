import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("matches snapshot", () => {
    const mockStageDefinition = {
      development: ["dev1", "dev2"],
      production: ["prod1"],
      staging: ["stage1", "stage2", "stage3"],
    };
    const { asFragment } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
