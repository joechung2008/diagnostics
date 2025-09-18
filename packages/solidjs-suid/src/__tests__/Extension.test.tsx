import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import Extension from "../Extension";

describe("Extension", () => {
  it("renders extensionName", () => {
    const { getByText } = render(() => (
      <Extension
        extensionName="websites"
        config={{ apiUrl: "https://example.com" }}
        stageDefinition={{ deploy: ["build", "release"] }}
      />
    ));
    expect(getByText("websites")).toBeInTheDocument();
  });
});
