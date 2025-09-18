import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import StageDefinition from "../../../app/components/StageDefinition.vue"
import type { StageDefinitionProps } from "../../../app/types/StageDefinitionProps"
import provide from "../../utils/defaultProvider"

describe("StageDefinition.vue", () => {
  it("should render joined values", () => {
    const props: StageDefinitionProps = {
      stageDefinition: {
        s1: ["a", "b"],
        s2: []
      }
    }

    const { getByText } = render(StageDefinition, {
      props,
      global: { provide }
    })

    // s1 stage
    expect(getByText("s1")).toBeTruthy()
    expect(getByText("a, b")).toBeTruthy()

    // s2 stage
    const s2Cell = getByText("s2")
    expect(s2Cell).toBeTruthy()
    expect(s2Cell.closest("tr")?.querySelectorAll("td")?.[1].textContent?.trim()).toBe("")
  })
})
