import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuildInfo from "../BuildInfo";

describe("BuildInfo", () => {
  it("matches snapshot", () => {
    const { container } = render(<BuildInfo buildVersion="1.0.0" />);
    expect(container).toMatchSnapshot();
  });
});
