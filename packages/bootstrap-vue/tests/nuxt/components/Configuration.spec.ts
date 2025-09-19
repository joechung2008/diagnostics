import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Configuration from "../../../app/components/Configuration.vue";

describe("Configuration", () => {
  it("should render configuration title", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: {}
      }
    });

    expect(wrapper.find("h2").text()).toBe("Configuration");
  });

  it("should render configuration entries correctly", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: {
          "api.url": "https://api.example.com",
          "app.name": "My App",
          "debug.enabled": "true"
        }
      }
    });

    expect(wrapper.text()).toContain("api.url");
    expect(wrapper.text()).toContain("https://api.example.com");
    expect(wrapper.text()).toContain("app.name");
    expect(wrapper.text()).toContain("My App");
    expect(wrapper.text()).toContain("debug.enabled");
    expect(wrapper.text()).toContain("true");
  });

  it("should render table with correct structure", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: {
          key1: "value1",
          key2: "value2"
        }
      }
    });

    const table = wrapper.find("table");
    expect(table.exists()).toBe(true);

    // Check for table headers
    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe("Key");
    expect(headers[1].text()).toBe("Value");

    // Check for table data
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(2);
  });

  it("should handle empty configuration", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: {}
      }
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("should handle undefined config", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: undefined
      }
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("should handle special characters in values", async () => {
    const wrapper = await mountSuspended(Configuration, {
      props: {
        config: {
          "special.key": "value with spaces & symbols !@#$%"
        }
      }
    });

    expect(wrapper.text()).toContain("value with spaces & symbols !@#$%");
  });
});
