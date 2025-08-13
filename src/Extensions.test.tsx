import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extensions from "./Extensions";

const mockExtensions = {
  ext1: { extensionName: "Extension 1" },
  ext2: { extensionName: "Extension 2" },
};

describe("Extensions", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Extensions extensions={mockExtensions} onLinkClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
