import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("renders stage key", () => {
    const { getByText } = render(() => (
      <StageDefinition stageDefinition={{ deploy: ["build", "release"] }} />
    ));
    expect(getByText("deploy")).toBeInTheDocument();
  });
});
