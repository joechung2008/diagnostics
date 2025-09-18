import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Extension from "../../../app/components/Extension.vue"

describe("Extension.vue", () => {
  it("renders extension name and both optional sections", () => {
    const props = {
      extensionName: "MyExt",
      config: { x: "1" },
      stageDefinition: { s: ["one"] }
    }

    const wrapper = mount(Extension, { props })

    expect(wrapper.text()).toContain("MyExt")
    expect(wrapper.text()).toContain("Configuration")
    expect(wrapper.text()).toContain("Stage Definitions")
  })

  it("renders extension name and configuration", () => {
    const props = {
      extensionName: "MyExt",
      config: { x: "1" }
    }

    const wrapper = mount(Extension, { props })

    expect(wrapper.text()).toContain("MyExt")
    expect(wrapper.text()).toContain("Configuration")
  })

  it("renders extension name and stage definitions", () => {
    const props = {
      extensionName: "MyExt",
      stageDefinition: { s: ["one"] }
    }

    const wrapper = mount(Extension, { props })

    expect(wrapper.text()).toContain("MyExt")
    expect(wrapper.text()).toContain("Stage Definitions")
  })
})
