import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Extension from './Extension.vue';
import type { ExtensionInfo } from './models';

describe('Extension', () => {
  const baseProps: ExtensionInfo = {
    extensionName: 'Test Extension',
  };

  it('should render extension name as heading', () => {
    const wrapper = mount(Extension, {
      props: baseProps,
    });

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Test Extension');
  });

  it('should render Configuration component when config is provided', () => {
    const propsWithConfig: ExtensionInfo = {
      ...baseProps,
      config: {
        apiUrl: 'https://api.example.com',
        timeout: '5000',
      },
    };

    const wrapper = mount(Extension, {
      props: propsWithConfig,
    });

    const configComponent = wrapper.findComponent({ name: 'Configuration' });
    expect(configComponent.exists()).toBe(true);
    expect(configComponent.props('config')).toEqual(propsWithConfig.config);
  });

  it('should not render Configuration component when config is not provided', () => {
    const wrapper = mount(Extension, {
      props: baseProps,
    });

    const configComponent = wrapper.findComponent({ name: 'Configuration' });
    expect(configComponent.exists()).toBe(false);
  });

  it('should render StageDefinition component when stageDefinition is provided', () => {
    const propsWithStages: ExtensionInfo = {
      ...baseProps,
      stageDefinition: {
        build: ['compile', 'test'],
        deploy: ['upload'],
      },
    };

    const wrapper = mount(Extension, {
      props: propsWithStages,
    });

    const stageComponent = wrapper.findComponent({ name: 'StageDefinition' });
    expect(stageComponent.exists()).toBe(true);
    // The prop gets converted from kebab-case to camelCase
    expect(stageComponent.props('stageDefinition')).toEqual(propsWithStages.stageDefinition);
  });

  it('should not render StageDefinition component when stageDefinition is not provided', () => {
    const wrapper = mount(Extension, {
      props: baseProps,
    });

    const stageComponent = wrapper.findComponent({ name: 'StageDefinition' });
    expect(stageComponent.exists()).toBe(false);
  });

  it('should render both Configuration and StageDefinition when both are provided', () => {
    const propsWithBoth: ExtensionInfo = {
      ...baseProps,
      config: { key: 'value' },
      stageDefinition: { stage: ['step'] },
    };

    const wrapper = mount(Extension, {
      props: propsWithBoth,
    });

    const configComponent = wrapper.findComponent({ name: 'Configuration' });
    const stageComponent = wrapper.findComponent({ name: 'StageDefinition' });

    expect(configComponent.exists()).toBe(true);
    expect(stageComponent.exists()).toBe(true);
  });

  it('should render only extension name when no optional props are provided', () => {
    const wrapper = mount(Extension, {
      props: baseProps,
    });

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Test Extension');

    const configComponent = wrapper.findComponent({ name: 'Configuration' });
    const stageComponent = wrapper.findComponent({ name: 'StageDefinition' });

    expect(configComponent.exists()).toBe(false);
    expect(stageComponent.exists()).toBe(false);
  });

  it('should have proper CSS classes', () => {
    const wrapper = mount(Extension, {
      props: baseProps,
    });

    const container = wrapper.find('.extension');
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain('extension');
  });
});
