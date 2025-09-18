import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "./StageDefinition";

describe("StageDefinition", () => {
  it("renders the stage definitions title", () => {
    render(
      <StageDefinition stageDefinition={{ stage1: ["step1", "step2"] }} />
    );
    expect(screen.getByText("Stage Definitions")).toBeInTheDocument();
  });
});
