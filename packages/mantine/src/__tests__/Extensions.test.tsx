import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Extensions from "../Extensions";
import { render } from "./test-utils";

describe("Extensions", () => {
  it("should render buttons for ExtensionInfo", () => {
    const extensions = {
      ext1: { extensionName: "ext1" } as ExtensionInfo,
      ext2: {
        lastError: { errorMessage: "error", time: "time" },
      } as ExtensionError,
    };
    const onLinkClick = vi.fn();
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onLinkClick when button is clicked", () => {
    const extensions = {
      ext1: { extensionName: "ext1" } as ExtensionInfo,
    };
    const onLinkClick = vi.fn();
    render(<Extensions extensions={extensions} onLinkClick={onLinkClick} />);

    fireEvent.click(screen.getByText("ext1"));
    expect(onLinkClick).toHaveBeenCalled();
  });
});
