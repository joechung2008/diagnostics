import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";
import { render } from "./test-utils";

describe("Configuration", () => {
  it("renders correctly", () => {
    const config = { key1: "value1", key2: "value2" };
    const { container } = render(<Configuration config={config} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
