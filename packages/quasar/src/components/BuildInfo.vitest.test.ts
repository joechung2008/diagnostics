import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BuildInfo from './BuildInfo.vue';

describe('BuildInfo', () => {
  it('should render build version in table', () => {
    const wrapper = mount(BuildInfo, {
      props: {
        buildVersion: '1.2.3',
      },
    });

    // Check if table is rendered
    const table = wrapper.findComponent({ name: 'q-table' });
    expect(table.exists()).toBe(true);

    // Check table props
    expect(table.props('flat')).toBe(true);

    // Check if the build version row is rendered
    const rows = table.props('rows');
    expect(rows).toEqual([{ name: 'Build Version', value: '1.2.3' }]);
  });

  it('should have correct column configuration', () => {
    const wrapper = mount(BuildInfo, {
      props: {
        buildVersion: '1.0.0',
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const columns = table.props('columns');

    expect(columns).toHaveLength(2);
    expect(columns[0]).toEqual({
      name: 'name',
      label: 'Name',
      field: 'name',
      align: 'left',
    });
    expect(columns[1]).toEqual({
      name: 'value',
      label: 'Value',
      field: 'value',
      align: 'left',
    });
  });

  it('should update when buildVersion prop changes', async () => {
    const wrapper = mount(BuildInfo, {
      props: {
        buildVersion: '1.0.0',
      },
    });

    let table = wrapper.findComponent({ name: 'q-table' });
    expect(table.props('rows')).toEqual([{ name: 'Build Version', value: '1.0.0' }]);

    await wrapper.setProps({ buildVersion: '2.0.0' });

    table = wrapper.findComponent({ name: 'q-table' });
    expect(table.props('rows')).toEqual([{ name: 'Build Version', value: '2.0.0' }]);
  });
});
