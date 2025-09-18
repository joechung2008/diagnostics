import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("matches snapshot", () => {
    const { container } = render(<Configuration config={{ key: "value" }} />);
    expect(container).toMatchSnapshot();
  });
});
