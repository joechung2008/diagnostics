import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemedApp from "../ThemedApp";

describe("ThemedApp", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<ThemedApp />);
    expect(asFragment()).toMatchSnapshot();
  });
});
