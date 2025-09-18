import StageDefinition from "@/StageDefinition";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("StageDefinition", () => {
  it("matches snapshot with sample data", () => {
    const stageDefinition = {
      build: ["compile", "test"],
      deploy: ["staging", "production"],
    };
    const { asFragment } = render(
      <StageDefinition stageDefinition={stageDefinition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with empty data", () => {
    const stageDefinition = {};
    const { asFragment } = render(
      <StageDefinition stageDefinition={stageDefinition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
