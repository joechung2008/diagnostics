import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Extensions extensions={{}} onLinkClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
