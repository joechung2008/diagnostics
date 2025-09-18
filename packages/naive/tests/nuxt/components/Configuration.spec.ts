import { render } from "@testing-library/vue"
import { describe, expect, it } from "vitest"
import Configuration from "../../../app/components/Configuration.vue"
import type { ConfigurationProps } from "../../../app/types/ConfigurationProps"
import provide from "../../utils/defaultProvider"

describe("Configuration.vue", () => {
  it("should render rows from config prop", () => {
    const props: ConfigurationProps = {
      config: {
        a: "1",
        b: "2"
      }
    }
    const { getByText } = render(Configuration, {
      props,
      global: { provide }
    })

    // a
    expect(getByText("a")).toBeTruthy()
    expect(getByText("1")).toBeTruthy()

    // b
    expect(getByText("b")).toBeTruthy()
    expect(getByText("2")).toBeTruthy()
  })
})
