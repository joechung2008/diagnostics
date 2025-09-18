import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Extensions from "./Extensions";

describe("Extensions", () => {
  it("renders the extensions menu", async () => {
    const extensions = {
      ext1: { extensionName: "Ext1" },
      ext2: { extensionName: "Ext2" },
    };
    const onLinkClick = vi.fn();
    render(<Extensions extensions={extensions} onLinkClick={onLinkClick} />);
    expect(await screen.findByLabelText("Extensions")).toBeInTheDocument();
  });
});
