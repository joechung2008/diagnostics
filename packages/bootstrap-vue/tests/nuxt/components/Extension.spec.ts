import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Extension from "../../../app/components/Extension.vue";

describe("Extension", () => {
  it("should render extension name as heading", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension"
      }
    });

    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("test-extension");
  });

  it("should render Configuration component when config is provided", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension",
        config: {
          setting1: "value1",
          setting2: "value2"
        }
      }
    });

    // Check that Configuration component is rendered
    expect(wrapper.text()).toContain("Configuration");
    expect(wrapper.text()).toContain("setting1");
    expect(wrapper.text()).toContain("value1");
  });

  it("should not render Configuration component when config is not provided", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension"
      }
    });

    expect(wrapper.text()).not.toContain("Configuration");
  });

  it("should render StageDefinition component when stageDefinition is provided", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension",
        stageDefinition: {
          stage1: ["step1", "step2"],
          stage2: ["step3"]
        }
      }
    });

    expect(wrapper.text()).toContain("Stage Definitions");
    expect(wrapper.text()).toContain("stage1");
    expect(wrapper.text()).toContain("step1, step2");
  });

  it("should not render StageDefinition component when stageDefinition is not provided", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension"
      }
    });

    expect(wrapper.text()).not.toContain("Stage Definitions");
  });

  it("should render both Configuration and StageDefinition when both are provided", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension",
        config: {
          setting1: "value1"
        },
        stageDefinition: {
          stage1: ["step1"]
        }
      }
    });

    expect(wrapper.text()).toContain("Configuration");
    expect(wrapper.text()).toContain("Stage Definitions");
    expect(wrapper.text()).toContain("setting1");
    expect(wrapper.text()).toContain("stage1");
  });

  it("should apply correct CSS classes", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension"
      }
    });

    const rootDiv = wrapper.find(".extension");
    expect(rootDiv.exists()).toBe(true);
    expect(rootDiv.classes()).toContain("extension");
  });

  it("should handle extension name with special characters", async () => {
    const wrapper = await mountSuspended(Extension, {
      props: {
        extensionName: "test-extension@v1.0.0"
      }
    });

    expect(wrapper.find("h1").text()).toBe("test-extension@v1.0.0");
  });
});
