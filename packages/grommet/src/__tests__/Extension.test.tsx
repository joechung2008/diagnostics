import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Extension from "../Extension";

describe("Extension", () => {
  it("renders with only extensionName", () => {
    const props = { extensionName: "TestExtension" };
    const { container } = render(<Extension {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with extensionName and config", () => {
    const props = {
      extensionName: "TestExtension",
      config: { apiUrl: "https://example.com" },
    };
    const { container } = render(<Extension {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with extensionName and stageDefinition", () => {
    const props = {
      extensionName: "TestExtension",
      stageDefinition: { build: ["compile"] },
    };
    const { container } = render(<Extension {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with extensionName, config, and stageDefinition", () => {
    const props = {
      extensionName: "TestExtension",
      config: { apiUrl: "https://example.com" },
      stageDefinition: { build: ["compile"] },
    };
    const { container } = render(<Extension {...props} />);
    expect(container).toMatchSnapshot();
  });
});
