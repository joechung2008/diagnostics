import { fireEvent, render } from "@testing-library/vue"
import { describe, expect, it, vi } from "vitest"
import Extensions from "../../../app/components/Extensions.vue"
import type { ExtensionsProps } from "../../../app/types/ExtensionsProps"
import provide from "../../utils/defaultProvider"

describe("Extensions.vue", () => {
  it("should render links and calls onLinkClick when clicked", async () => {
    const props: ExtensionsProps = {
      extensions: {
        ext1: { extensionName: "ext1" },
        ext2: { extensionName: "ext2" }
      },
      onLinkClick: vi.fn()
    }

    const { getByText } = render(Extensions, {
      props,
      global: { provide }
    })

    // Make sure both extension links are rendered.
    const btn = getByText("ext1")
    expect(btn).toBeTruthy()
    expect(getByText("ext2")).toBeTruthy()

    // Click the first extension link.
    await fireEvent.click(btn)
    expect(props.onLinkClick).toHaveBeenCalled()
  })
})
