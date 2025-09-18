import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuildInfo from "./BuildInfo";

describe("BuildInfo", () => {
  it("renders without crashing", () => {
    render(<BuildInfo buildVersion="1.0.0" />);
    // Check for the Ant Design Table with the correct aria-label
    expect(screen.getByLabelText("Build Info")).toBeInTheDocument();
  });
});
