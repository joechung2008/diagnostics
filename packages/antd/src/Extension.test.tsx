import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extension from "./Extension";

describe("Extension", () => {
  it("renders the extension name", () => {
    render(<Extension extensionName="Test Extension" />);
    expect(
      screen.getByRole("heading", { name: "Test Extension" })
    ).toBeInTheDocument();
  });
});
