import { describe, expect, it } from "vitest";
import BuildInfo from "../BuildInfo";
import { render } from "./test-utils";

describe("BuildInfo", () => {
  it("renders correctly", () => {
    const { container } = render(<BuildInfo buildVersion="1.0.0" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
