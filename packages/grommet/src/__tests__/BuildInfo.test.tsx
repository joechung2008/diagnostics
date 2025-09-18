import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BuildInfo from "../BuildInfo";

describe("BuildInfo", () => {
  it("matches snapshot", () => {
    const { container } = render(<BuildInfo buildVersion="1.2.3" />);
    expect(container).toMatchSnapshot();
  });
});
