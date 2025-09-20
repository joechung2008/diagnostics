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

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(3);

    // Check first row
    const firstRowCells = rows[0]?.findAll('td');
    expect(firstRowCells?.[0]?.text()).toBe('build');
    expect(firstRowCells?.[1]?.text()).toBe('compile, test, package');

    // Check second row
    const secondRowCells = rows[1]?.findAll('td');
    expect(secondRowCells?.[0]?.text()).toBe('deploy');
    expect(secondRowCells?.[1]?.text()).toBe('upload, restart');

    // Check third row
    const thirdRowCells = rows[2]?.findAll('td');
    expect(thirdRowCells?.[0]?.text()).toBe('cleanup');
    expect(thirdRowCells?.[1]?.text()).toBe('remove-temp-files');
  });

  it('should handle single-item arrays', () => {
    const stageDefinition = {
      single: ['only-step'],
    };

    const wrapper = mount(StageDefinition, {
      props: { stageDefinition },
    });

    const table = wrapper.findComponent({ name: 'q-markup-table' });
    expect(table.exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.findAll('td');
    expect(cells?.[0]?.text()).toBe('single');
    expect(cells?.[1]?.text()).toBe('only-step');
  });

  it('should handle empty arrays', () => {
    const stageDefinition = {
      empty: [],
    };

    const wrapper = mount(StageDefinition, {
      props: { stageDefinition },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.findAll('td');
    expect(cells?.[0]?.text()).toBe('empty');
    expect(cells?.[1]?.text()).toBe('');
  });

  it('should handle empty stageDefinition object', () => {
    const wrapper = mount(StageDefinition, {
      props: {
        stageDefinition: {},
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(0);
  });

  it('should have correct table headers', () => {
    const wrapper = mount(StageDefinition, {
      props: {
        stageDefinition: { test: ['step'] },
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const headers = wrapper.findAll('thead th');
    expect(headers).toHaveLength(2);
    expect(headers[0]?.text()).toBe('Key');
    expect(headers[1]?.text()).toBe('Value');
  });
});
