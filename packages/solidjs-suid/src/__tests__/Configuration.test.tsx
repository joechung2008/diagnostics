import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("renders config keys", () => {
    const { getByText } = render(() => (
      <Configuration
        config={{ apiUrl: "https://example.com", theme: "dark" }}
      />
    ));
    expect(getByText("apiUrl")).toBeInTheDocument();
    expect(getByText("theme")).toBeInTheDocument();
  });
});
