import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  it("renders with empty extensions", () => {
    const extensions = {};
    const onLinkClick = vi.fn();
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with valid extensions", () => {
    const extensions = {
      ext1: { extensionName: "Ext1", name: "Extension One", version: "1.0.0" },
      ext2: { extensionName: "Ext2", name: "Extension Two", version: "2.0.0" },
    };
    const onLinkClick = vi.fn();
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with mixed extensions", () => {
    const extensions = {
      ext1: { extensionName: "Ext1", name: "Extension One", version: "1.0.0" },
      ext2: { lastError: { errorMessage: "fail", time: "now" } }, // not ExtensionInfo
    };
    const onLinkClick = vi.fn();
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });
});
