import Configuration from "@/lib/components/Configuration.svelte";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

describe("Configuration", () => {
  it("renders when config is provided", () => {
    render(Configuration, { config: { foo: "bar" } });
    expect(screen.getByText("Configuration")).toBeInTheDocument();
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
  });
});
