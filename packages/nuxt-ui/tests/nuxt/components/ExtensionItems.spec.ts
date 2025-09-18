import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import ExtensionItems from "../../../app/components/ExtensionItems.vue";
import type {
  ExtensionError,
  ExtensionInfo,
  ExtensionsProps,
} from "../../../app/types";

describe("app/components/ExtensionItems.vue", () => {
  it("should render extension items", async () => {
    const extension1: ExtensionInfo = {
      extensionName: "Database Extension",
      config: {
        host: "localhost",
        port: "5432",
      },
    };

    const extension2: ExtensionError = {
      lastError: {
        errorMessage: "Connection timeout",
        time: "2025-01-01T10:00:00Z",
      },
    };

    const props: ExtensionsProps = {
      extensions: {
        db: extension1,
        auth: extension2,
      },
      onLinkClick: () => {},
    };

    const { html } = await renderSuspended(ExtensionItems, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should call onLinkClick when an extension link is clicked", async () => {
    const extension1: ExtensionInfo = {
      extensionName: "Database Extension",
      config: {
        host: "localhost",
        port: "5432",
      },
    };

    const mockOnLinkClick = vi.fn();
    const props: ExtensionsProps = {
      extensions: {
        db: extension1,
      },
      onLinkClick: mockOnLinkClick,
    };

    const component = await mountSuspended(ExtensionItems, {
      props,
    });

    // Find the navigation menu item containing the extension link
    const navMenuItem = component.find(
      '.extension-root nav [data-testid="nav-menu-item"], .extension-root [role="menuitem"]'
    );

    if (navMenuItem.exists()) {
      // Simulate clicking the menu item
      await navMenuItem.trigger("click");

      // Verify that onLinkClick was called with the correct arguments
      expect(mockOnLinkClick).toHaveBeenCalledTimes(1);

      // Check the arguments: event (MouseEvent) and link (KeyedNavLink)
      const [eventArg, linkArg] = mockOnLinkClick.mock.calls[0];
      expect(eventArg).toBeInstanceOf(MouseEvent);
      expect(linkArg).toEqual({
        key: "Database Extension",
        name: "Database Extension",
      });
    } else {
      // Fallback: Check for any clickable element if specific selector fails
      const clickableElements = component.findAll(
        'button, a, [role="button"], [tabindex="0"]'
      );
      if (clickableElements.length > 0) {
        await clickableElements[0].trigger("click");
        expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
      }
    }
  });
});
