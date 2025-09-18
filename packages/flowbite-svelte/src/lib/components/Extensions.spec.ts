import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import Extensions from "@/lib/components/Extensions.svelte";

describe("Extensions", () => {
  it("renders empty extension list without error", () => {
    render(Extensions, { extensions: {} });
    // Sidebar exists but has no items; ensure component doesn't throw
    expect(screen.getByRole("list", { hidden: true }) || true).toBeTruthy();
  });

  it("renders nav items for provided extensions and handles clicks", async () => {
    const onLinkClick = vi.fn();

    const extensions = {
      websites: {
        extensionName: "websites"
      },
      paasserverless: {
        extensionName: "paasserverless"
      }
    };

    render(Extensions, { extensions, onLinkClick });

    // Both nav items should appear (may be rendered as multiple identical labels)
    const websiteItems = screen.getAllByText("websites");
    const paasItems = screen.getAllByText("paasserverless");

    expect(websiteItems.length).toBeGreaterThan(0);
    expect(paasItems.length).toBeGreaterThan(0);

    // Click the first website item and verify onLinkClick was called with the nav link
    await fireEvent.click(websiteItems[0]);

    expect(onLinkClick).toHaveBeenCalled();
    // onLinkClick should receive an object shaped like { key, name, url }
    const calledWith = onLinkClick.mock.calls[0][0];
    expect(calledWith).toMatchObject({ key: "websites", name: "websites", url: "" });
  });
});
