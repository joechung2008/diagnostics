import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import BuildInfo from "../BuildInfo";

describe("BuildInfo", () => {
  it("renders buildVersion", () => {
    const { getByText } = render(() => <BuildInfo buildVersion="1.0.0" />);
    expect(getByText("1.0.0")).toBeInTheDocument();
  });
});
