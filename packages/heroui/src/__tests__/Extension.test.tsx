import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extension from "../Extension";

describe("Extension", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Extension extensionName="test-extension" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
