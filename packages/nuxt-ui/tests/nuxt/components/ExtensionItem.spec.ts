import { renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import ExtensionItem from "../../../app/components/ExtensionItem.vue";
import type { ExtensionInfo } from "../../../app/types";

describe("app/components/ExtensionItem.vue", () => {
  it("should render extension item with config", async () => {
    const props: ExtensionInfo = {
      extensionName: "Database Extension",
      config: {
        host: "localhost",
        port: "5432",
      },
    };

    const { html } = await renderSuspended(ExtensionItem, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should render extension item with stage definition", async () => {
    const props: ExtensionInfo = {
      extensionName: "Auth Extension",
      stageDefinition: {
        development: ["local", "dev-db"],
        production: ["prod-db", "prod-cache"],
      },
    };

    const { html } = await renderSuspended(ExtensionItem, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });
});
