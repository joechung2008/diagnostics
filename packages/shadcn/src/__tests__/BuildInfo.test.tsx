import BuildInfo from "@/BuildInfo";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("BuildInfo", () => {
  it("matches snapshot with sample buildVersion", () => {
    const { asFragment } = render(<BuildInfo buildVersion="1.2.3+abc123" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with empty buildVersion", () => {
    const { asFragment } = render(<BuildInfo buildVersion="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
