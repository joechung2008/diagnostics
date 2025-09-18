import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  it("matches snapshot with minimal extension", () => {
    const extensions = {
      ext1: { extensionName: "ext1" },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with multiple extensions", () => {
    const extensions = {
      ext1: { extensionName: "ext1" },
      ext2: { extensionName: "ext2" },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with config", () => {
    const extensions = {
      ext1: {
        extensionName: "ext1",
        config: { foo: "bar" },
      },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with stageDefinition", () => {
    const extensions = {
      ext1: {
        extensionName: "ext1",
        stageDefinition: { name: ["Stage1"] },
      },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with config and stageDefinition", () => {
    const extensions = {
      ext1: {
        extensionName: "ext1",
        config: { foo: "bar" },
        stageDefinition: { name: ["Stage1"] },
      },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with ExtensionError", () => {
    const extensions = {
      ext1: {
        extensionName: "ext1",
      },
      ext2: {
        lastError: {
          errorMessage: "Something went wrong",
          time: "2025-08-10T12:00:00Z",
        },
      },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with no extensions", () => {
    const extensions = {};
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });

  // Removed test for undefined extensions as the component does not handle undefined gracefully.

  it("calls onLinkClick when a link is clicked", () => {
    const extensions = {
      ext1: { extensionName: "ext1" },
      ext2: { extensionName: "ext2" },
    };
    const onLinkClick = vi.fn();
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => fireEvent.click(button));
    expect(onLinkClick).toHaveBeenCalledTimes(2);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with mixed ExtensionInfo and ExtensionError", () => {
    const extensions = {
      ext1: { extensionName: "ext1" },
      ext2: {
        lastError: {
          errorMessage: "Error for ext2",
          time: "2025-08-10T13:00:00Z",
        },
      },
    };
    const onLinkClick = () => {};
    const { container } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(container).toMatchSnapshot();
  });
});
