import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StageDefinition from './StageDefinition.vue';

describe('StageDefinition', () => {
  it('should render stage definitions title', () => {
    const wrapper = mount(StageDefinition, {
      props: {
        stageDefinition: {},
      },
    });

    const title = wrapper.find('h2');
    expect(title.text()).toBe('Stage Definitions');
  });

  it('should render stage definitions as table rows with joined values', () => {
    const stageDefinition = {
      build: ['compile', 'test', 'package'],
      deploy: ['upload', 'restart'],
      cleanup: ['remove-temp-files'],
    };

    const wrapper = mount(StageDefinition, {
      props: { stageDefinition },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    expect(table.exists()).toBe(true);

    const rows = table.props('rows');
    expect(rows).toHaveLength(3);
    expect(rows).toEqual([
      { key: 'build', value: 'compile, test, package' },
      { key: 'deploy', value: 'upload, restart' },
      { key: 'cleanup', value: 'remove-temp-files' },
    ]);
  });

  it('should handle single-item arrays', () => {
    const stageDefinition = {
      single: ['only-step'],
    };

    const wrapper = mount(StageDefinition, {
      props: { stageDefinition },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');

    expect(rows).toEqual([{ key: 'single', value: 'only-step' }]);
  });

  it('should handle empty arrays', () => {
    const stageDefinition = {
      empty: [],
    };

    const wrapper = mount(StageDefinition, {
      props: { stageDefinition },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');

    expect(rows).toEqual([{ key: 'empty', value: '' }]);
  });

  it('should handle empty stageDefinition object', () => {
    const wrapper = mount(StageDefinition, {
      props: {
        stageDefinition: {},
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');
    expect(rows).toEqual([]);
  });

  it('should have correct column configuration', () => {
    const wrapper = mount(StageDefinition, {
      props: {
        stageDefinition: { test: ['step'] },
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const columns = table.props('columns');

    expect(columns).toHaveLength(2);
    expect(columns[0]).toEqual({
      name: 'key',
      label: 'Key',
      field: 'key',
      align: 'left',
    });
    expect(columns[1]).toEqual({
      name: 'value',
      label: 'Value',
      field: 'value',
      align: 'left',
    });
  });
});
