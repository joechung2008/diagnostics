import Layout from "@/routes/+layout.svelte";
import { render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";

describe("+layout.svelte", () => {
  beforeEach(() => {
    document.title = "";
  });

  it("sets the document title", () => {
    render(Layout);
    expect(document.title).toBe("Azure Portal Extension Dashboard");
  });

  it("includes a favicon link in head", () => {
    render(Layout);
    const icon = document.head.querySelector('link[rel="icon"]');
    expect(icon).not.toBeNull();
  });

  it("adds a description meta tag to head", () => {
    render(Layout);
    const desc = document.head.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc?.getAttribute("content")).toBe("Information about extensions in the Azure portal");
  });
});
