import { renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ConfigurationInfo from "../../../app/components/ConfigurationInfo.vue";
import type { ConfigurationProps } from "../../../app/types";

describe("app/components/ConfigurationInfo.vue", () => {
  it("should render configuration info", async () => {
    const props: ConfigurationProps = {
      config: {
        database: "postgresql",
        cache: "redis",
        port: "8080",
      },
    };

    const { html } = await renderSuspended(ConfigurationInfo, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });
});
