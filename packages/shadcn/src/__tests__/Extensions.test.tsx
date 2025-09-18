import Extensions from "@/Extensions";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Extensions", () => {
  it("matches snapshot with mixed extensions (info + error)", () => {
    const onLinkClick = vi.fn();
    const extensions = {
      alpha: {
        extensionName: "alpha",
        config: { KEY: "VALUE" },
        stageDefinition: {
          build: ["compile", "test"],
          deploy: ["staging", "production"],
        },
      },
      beta: {
        extensionName: "beta",
      },
      gammaError: {
        lastError: {
          errorMessage: "Failed to load",
          time: "2025-08-11T20:00:00Z",
        },
      },
    };
    const { asFragment } = render(
      <Extensions extensions={extensions} onLinkClick={onLinkClick} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with no extensions", () => {
    const { asFragment } = render(
      <Extensions extensions={{}} onLinkClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
