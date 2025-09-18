import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("matches snapshot", () => {
    const mockStageDefinition = {};
    const { asFragment } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
