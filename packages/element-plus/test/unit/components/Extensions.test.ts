import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import Extensions from "../../../app/components/Extensions.vue"

describe("Extensions.vue", () => {
  it("renders extension buttons and calls onLinkClick", async () => {
    const extensions = {
      a: { extensionName: "A" },
      b: { extensionName: "B" }
    }

    const onLinkClick = vi.fn()
    const wrapper = mount(Extensions, { props: { extensions, onLinkClick } })

    const buttons = wrapper.findAll("button")
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(wrapper.text()).toContain("A")
    expect(wrapper.text()).toContain("B")

    await buttons[0].trigger("click")
    expect(onLinkClick).toHaveBeenCalled()
  })
})
