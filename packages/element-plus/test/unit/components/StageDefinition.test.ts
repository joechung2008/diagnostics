import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import StageDefinition from "../../../app/components/StageDefinition.vue"

describe("StageDefinition.vue", () => {
  it("renders stage definition rows", () => {
    const stageDefinition = { s1: ["a", "b"], s2: ["c"] }
    const wrapper = mount(StageDefinition, { props: { stageDefinition } })

    expect(wrapper.text()).toContain("Stage Definitions")
    expect(wrapper.text()).toContain("s1")
    expect(wrapper.text()).toContain("a, b")
    expect(wrapper.text()).toContain("s2")
    expect(wrapper.text()).toContain("c")
  })
})
