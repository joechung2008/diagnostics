import { describe, expect, it } from "vitest";
import Extensions from "../Extensions";
import { render } from "./test-utils";

describe("Extensions", () => {
  it("renders correctly with extensions", () => {
    const extensions = {
      ext1: { extensionName: "extension1", config: { key: "value" } },
      ext2: { extensionName: "extension2" },
    };
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={() => {}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with empty extensions", () => {
    const extensions = {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={() => {}} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
