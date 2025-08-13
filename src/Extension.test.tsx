import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extension from "./Extension";

const mockProps = {
  extensionName: "Test Extension",
  config: { foo: "bar" },
  stageDefinition: { build: ["compile", "test"] },
};

describe("Extension", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Extension {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
