import { render } from "@testing-library/vue"
import { describe, it, expect } from "vitest"
import Extension from "../../../app/components/Extension.vue"
import provide from "../../utils/defaultProvider"

describe("Extension.vue", () => {
  it("should render title and child components when props provided", () => {
    const props = {
      extensionName: "extA",
      config: { k: "v" },
      stageDefinition: { s: ["x"] }
    }
    const { getByText, container } = render(Extension, {
      props,
      global: { provide }
    })

    expect(getByText("extA")).toBeTruthy()
    expect(container.querySelectorAll(".n-h2").length).toBeGreaterThanOrEqual(2)
  })

  it("should render only title when no config or stage definition", () => {
    const props = { extensionName: "extB" }
    const { getByText, container } = render(Extension, {
      props,
      global: { provide }
    })

    expect(getByText("extB")).toBeTruthy()
    expect(container.querySelectorAll(".n-h2").length).toEqual(0)
  })
})
