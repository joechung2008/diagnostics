import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import Extensions from "../../../app/components/Extensions.vue";
import type { ExtensionError, ExtensionInfo } from "../../../app/types/Extension";

describe("Extensions", () => {
  const mockExtensionInfo: ExtensionInfo = {
    extensionName: "test-extension",
    config: { key: "value" }
  };

  const mockExtensionError: ExtensionError = {
    lastError: {
      errorMessage: "Test error",
      time: "2023-01-01T00:00:00Z"
    }
  };

  it("should render extension links correctly", async () => {
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: {
          ext1: mockExtensionInfo,
          ext2: { ...mockExtensionInfo, extensionName: "another-extension" }
        },
        onLinkClick: vi.fn()
      }
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBe(2);

    // Links should be sorted alphabetically
    expect(links[0].text()).toBe("another-extension");
    expect(links[1].text()).toBe("test-extension");
  });

  it("should filter out extension errors", async () => {
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: {
          ext1: mockExtensionInfo,
          ext2: mockExtensionError
        },
        onLinkClick: vi.fn()
      }
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBe(1);
    expect(links[0].text()).toBe("test-extension");
  });

  it("should call onLinkClick when link is clicked", async () => {
    const onLinkClick = vi.fn();
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: {
          ext1: mockExtensionInfo
        },
        onLinkClick
      }
    });

    const link = wrapper.find("a");
    await link.trigger("click");

    expect(onLinkClick).toHaveBeenCalledWith({
      key: "test-extension",
      name: "test-extension",
      url: ""
    });
  });

  it("should handle empty extensions object", async () => {
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: {},
        onLinkClick: vi.fn()
      }
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBe(0);
  });

  it("should handle undefined extensions", async () => {
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: undefined,
        onLinkClick: vi.fn()
      }
    });

    const links = wrapper.findAll("a");
    expect(links.length).toBe(0);
  });

  it("should render navigation with correct classes", async () => {
    const wrapper = await mountSuspended(Extensions, {
      props: {
        extensions: {
          ext1: mockExtensionInfo
        },
        onLinkClick: vi.fn()
      }
    });

    const nav = wrapper.find("nav");
    expect(nav.exists()).toBe(true);
    expect(nav.classes()).toContain("extensions");
    expect(nav.attributes("aria-label")).toBe("Extensions");
  });
});
