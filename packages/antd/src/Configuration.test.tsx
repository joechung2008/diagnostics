import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "./Configuration";

describe("Configuration", () => {
  it("renders without crashing", () => {
    render(<Configuration config={{ foo: "bar" }} />);
    expect(screen.getByLabelText("Configuration")).toBeInTheDocument();
  });
});
