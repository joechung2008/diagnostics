import BuildInfo from "@/lib/components/BuildInfo.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("BuildInfo", () => {
  it("renders build version", () => {
    render(BuildInfo, { buildVersion: "1.2.3" });
    expect(screen.getByText("Build Version")).toBeInTheDocument();
    expect(screen.getByText("1.2.3")).toBeInTheDocument();
  });
});
