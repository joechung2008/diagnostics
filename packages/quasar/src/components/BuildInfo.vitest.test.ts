import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BuildInfo from './BuildInfo.vue';

describe('BuildInfo', () => {
  it('should render build version in markup table', () => {
    const wrapper = mount(BuildInfo, {
      props: {
        buildVersion: '1.2.3',
      },
    });

    // Check if markup table is rendered
    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    // Check if the build version row is rendered
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(1);

    const firstRow = rows[0];
    expect(firstRow).toBeDefined();

    const cells = firstRow?.findAll('td');
    expect(cells).toHaveLength(2);
    expect(cells?.[0]?.text()).toBe('Build Version');
    expect(cells?.[1]?.text()).toBe('1.2.3');
  });

  it('should have correct table headers', () => {
    const wrapper = mount(BuildInfo, {
      props: {
        buildVersion: '1.0.0',
      },
    });

    expect(wrapper.findComponent({ name: 'q-markup-table' }).exists()).toBe(true);

    const headers = wrapper.findAll('thead th');
    expect(headers).toHaveLength(2);
    expect(headers[0]?.text()).toBe('Name');
    expect(headers[1]?.text()).toBe('Value');
  });
});
