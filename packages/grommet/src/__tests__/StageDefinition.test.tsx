import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("matches snapshot", () => {
    const stageDefinition = {
      build: ["compile", "test"],
      deploy: ["upload", "restart"],
    };
    const { container } = render(
      <StageDefinition stageDefinition={stageDefinition} />
    );
    expect(container).toMatchSnapshot();
  });
});
