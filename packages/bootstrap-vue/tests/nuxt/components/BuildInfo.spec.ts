import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import BuildInfo from "../../../app/components/BuildInfo.vue";

describe("BuildInfo", () => {
  it("should render build version correctly", async () => {
    const wrapper = await mountSuspended(BuildInfo, {
      props: {
        buildVersion: "1.2.3"
      }
    });

    expect(wrapper.text()).toContain("Build Version");
    expect(wrapper.text()).toContain("1.2.3");
  });

  it("should render table with correct structure", async () => {
    const wrapper = await mountSuspended(BuildInfo, {
      props: {
        buildVersion: "2.0.0"
      }
    });

    const table = wrapper.find("table");
    expect(table.exists()).toBe(true);

    // Check for table headers
    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe("Name");
    expect(headers[1].text()).toBe("Value");

    // Check for table data
    const cells = wrapper.findAll("td");
    expect(cells.length).toBe(2);
    expect(cells[0].text()).toBe("Build Version");
    expect(cells[1].text()).toBe("2.0.0");
  });

  it("should handle different build versions", async () => {
    const wrapper = await mountSuspended(BuildInfo, {
      props: {
        buildVersion: "dev-12345"
      }
    });

    expect(wrapper.text()).toContain("dev-12345");
  });
});
