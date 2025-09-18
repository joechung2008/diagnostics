import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Configuration from "../../../app/components/Configuration.vue"

describe("Configuration.vue", () => {
  it("renders config rows from prop", () => {
    const config = { a: "1", b: "two" }
    const wrapper = mount(Configuration, { props: { config } })

    expect(wrapper.text()).toContain("Configuration")
    expect(wrapper.text()).toContain("a")
    expect(wrapper.text()).toContain("1")
    expect(wrapper.text()).toContain("b")
    expect(wrapper.text()).toContain("two")
  })
})
