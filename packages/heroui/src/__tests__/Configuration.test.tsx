import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Configuration config={{}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
