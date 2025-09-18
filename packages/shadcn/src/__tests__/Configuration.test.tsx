import Configuration from "@/Configuration";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Configuration", () => {
  it("matches snapshot with multiple config entries", () => {
    const config = {
      API_URL: "https://api.example.com",
      FEATURE_FLAG_X: "true",
      TIMEOUT_MS: "5000",
    };
    const { asFragment } = render(<Configuration config={config} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with empty config", () => {
    const config = {};
    const { asFragment } = render(<Configuration config={config} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
