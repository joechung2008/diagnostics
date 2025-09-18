import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import BuildInfo from "../../../app/components/BuildInfo.vue"
import type { BuildInfoProps } from "../../../app/types/BuildInfoProps"
import provide from "../../utils/defaultProvider"

describe("BuildInfo.vue", () => {
  it("should render build version row", () => {
    const props: BuildInfoProps = { buildVersion: "1.2.3" }
    const { getByText } = render(BuildInfo, {
      props,
      global: { provide }
    })

    expect(getByText("Build Version")).toBeTruthy()
    expect(getByText("1.2.3")).toBeTruthy()
  })
})
