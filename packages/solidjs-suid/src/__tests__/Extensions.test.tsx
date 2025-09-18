import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  it("renders multiple extensionNames", () => {
    const { getByText } = render(() => (
      <Extensions
        extensions={{
          websites: {
            extensionName: "websites",
            config: { apiUrl: "https://example.com" },
            stageDefinition: { deploy: ["build", "release"] },
          },
          functions: {
            extensionName: "functions",
            config: { apiUrl: "https://functions.example.com" },
            stageDefinition: { deploy: ["build", "release"] },
          },
        }}
        onLinkClick={() => {}}
      />
    ));
    expect(getByText("websites")).toBeInTheDocument();
    expect(getByText("functions")).toBeInTheDocument();
  });
});
