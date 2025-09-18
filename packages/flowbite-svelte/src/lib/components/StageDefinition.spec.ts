import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

import StageDefinition from "@/lib/components/StageDefinition.svelte";

describe("StageDefinition", () => {
  it("renders when given a stageDefinition", () => {
    render(StageDefinition, { stageDefinition: { stages: [] } });
    expect(screen.getByText("Stage Definitions")).toBeInTheDocument();
  });

  it("renders a single stage correctly", () => {
    render(StageDefinition, { stageDefinition: { stages: ["alpha"] } });

    // The table should show a row with key 'stages' and value 'alpha'
    expect(screen.getByText("stages")).toBeInTheDocument();
    expect(screen.getByText("alpha")).toBeInTheDocument();
  });

  it("renders multiple stages as comma-separated list", () => {
    render(StageDefinition, { stageDefinition: { stages: ["alpha", "beta", "gamma"] } });

    expect(screen.getByText("stages")).toBeInTheDocument();
    // The component joins stage values with ', '
    expect(screen.getByText("alpha, beta, gamma")).toBeInTheDocument();
  });
});
