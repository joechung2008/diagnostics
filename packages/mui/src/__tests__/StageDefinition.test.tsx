import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <StageDefinition stageDefinition={{ stage1: ["step1", "step2"] }} />
    );
    expect(container).toMatchSnapshot();
  });
});
