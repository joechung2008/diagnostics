import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  it("matches snapshot", () => {
    const mockExtensions = { ext1: { extensionName: "SampleExtension" } };
    const mockOnLinkClick = () => {};
    const { asFragment } = render(
      <Extensions extensions={mockExtensions} onLinkClick={mockOnLinkClick} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
