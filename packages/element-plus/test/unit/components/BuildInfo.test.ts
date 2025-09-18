import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import BuildInfo from "../../../app/components/BuildInfo.vue"

describe("BuildInfo.vue", () => {
  it("renders build version row", () => {
    const wrapper = mount(BuildInfo, {
      props: { buildVersion: "1.2.3" }
    })

    expect(wrapper.text()).toContain("Build Version")
    expect(wrapper.text()).toContain("1.2.3")
  })
})
