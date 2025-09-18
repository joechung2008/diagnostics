import Extension from "@/Extension";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Extension", () => {
  it("matches snapshot with full data (config + stageDefinition)", () => {
    const props = {
      extensionName: "sample-extension",
      config: {
        FOO: "bar",
        BAZ: "qux",
      },
      stageDefinition: {
        build: ["compile", "unit-test"],
        release: ["staging", "production"],
      },
    };
    const { asFragment } = render(<Extension {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with only extensionName", () => {
    const props = {
      extensionName: "minimal-extension",
    };
    const { asFragment } = render(<Extension {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
