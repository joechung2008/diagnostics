import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("matches snapshot", () => {
    const config = { apiUrl: "https://example.com", theme: "dark" };
    const { container } = render(<Configuration config={config} />);
    expect(container).toMatchSnapshot();
  });
});
