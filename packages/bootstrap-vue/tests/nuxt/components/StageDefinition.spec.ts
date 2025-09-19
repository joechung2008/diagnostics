import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import StageDefinition from "../../../app/components/StageDefinition.vue";

describe("StageDefinition", () => {
  it("should render stage definitions title", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {}
      }
    });

    expect(wrapper.find("h2").text()).toBe("Stage Definitions");
  });

  it("should render stage definitions correctly", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {
          build: ["compile", "test", "package"],
          deploy: ["upload", "restart"],
          cleanup: ["remove-temp"]
        }
      }
    });

    expect(wrapper.text()).toContain("build");
    expect(wrapper.text()).toContain("compile, test, package");
    expect(wrapper.text()).toContain("deploy");
    expect(wrapper.text()).toContain("upload, restart");
    expect(wrapper.text()).toContain("cleanup");
    expect(wrapper.text()).toContain("remove-temp");
  });

  it("should render table with correct structure", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {
          stage1: ["step1", "step2"],
          stage2: ["step3"]
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

  it("should handle empty stage definition", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {}
      }
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("should handle undefined stageDefinition", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: undefined
      }
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("should handle single step stages", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {
          single: ["only-step"]
        }
      }
    });

    expect(wrapper.text()).toContain("single");
    expect(wrapper.text()).toContain("only-step");
  });

  it("should handle multiple steps joined with commas", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {
          multi: ["first", "second", "third"]
        }
      }
    });

    expect(wrapper.text()).toContain("first, second, third");
  });

  it("should handle stages with special characters in step names", async () => {
    const wrapper = await mountSuspended(StageDefinition, {
      props: {
        stageDefinition: {
          special: ["step-with-dash", "step_with_underscore", "step@symbol"]
        }
      }
    });

    expect(wrapper.text()).toContain("step-with-dash, step_with_underscore, step@symbol");
  });
});
