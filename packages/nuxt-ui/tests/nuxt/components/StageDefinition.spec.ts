import { mountSuspended, renderSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import type { StageDefinitionProps } from "../../../app/types";
import StageDefinition from "../../../app/components/StageDefinition.vue";

describe("app/components/StageDefinition.vue", () => {
  it("should mount", async () => {
    const props: StageDefinitionProps = {
      stageDefinition: {},
    };

    const component = await mountSuspended(StageDefinition, {
      props,
    });
    expect(component).toBeDefined();
  });

  it("should render empty table when no stageDefinition is provided", async () => {
    const props: StageDefinitionProps = {
      stageDefinition: {},
    };

    const { html } = await renderSuspended(StageDefinition, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should render table with stage definition data", async () => {
    const props: StageDefinitionProps = {
      stageDefinition: {
        stages: ["stage1", "stage2"],
        steps: ["step1", "step2", "step3"],
      },
    };

    const { html } = await renderSuspended(StageDefinition, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should render single value as string", async () => {
    const props: StageDefinitionProps = {
      stageDefinition: {
        version: ["1.0"],
        name: ["test"],
      },
    };

    const { html } = await renderSuspended(StageDefinition, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });

  it("should render font-mono class for key data", async () => {
    const props: StageDefinitionProps = {
      stageDefinition: {
        key: ["value"],
      },
    };

    const { html } = await renderSuspended(StageDefinition, {
      props,
    });

    expect(html()).toMatchSnapshot();
  });
});
