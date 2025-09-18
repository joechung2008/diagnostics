import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("matches snapshot", () => {
    const mockConfig = {};
    const { asFragment } = render(<Configuration config={mockConfig} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
