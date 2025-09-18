import { renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import BuildInfo from "../../../app/components/BuildInfo.vue";
import type { BuildInfoProps } from "../../../app/types";

describe("app/components/BuildInfo.vue", () => {
  it("should render build info", async () => {
    const props: BuildInfoProps = {
      buildVersion: "1.2.3",
    };

    const { html } = await renderSuspended(BuildInfo, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });
});
