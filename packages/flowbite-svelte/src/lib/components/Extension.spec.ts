import Extension from "@/lib/components/Extension.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Extension", () => {
  it("renders extension name", () => {
    render(Extension, {
      extensionName: "websites"
    });
    expect(screen.getByText("websites")).toBeInTheDocument();
  });
});
