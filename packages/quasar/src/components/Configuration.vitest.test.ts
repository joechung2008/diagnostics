import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Configuration from './Configuration.vue';

describe('Configuration', () => {
  it('should render configuration title', () => {
    const wrapper = mount(Configuration, {
      props: {
        config: {},
      },
    });

    const title = wrapper.find('h2');
    expect(title.text()).toBe('Configuration');
  });

  it('should render config entries as table rows', () => {
    const config = {
      apiUrl: 'https://api.example.com',
      timeout: '5000',
      debug: 'true',
    };

    const wrapper = mount(Configuration, {
      props: { config },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    expect(table.exists()).toBe(true);

    const rows = table.props('rows');
    expect(rows).toHaveLength(3);
    expect(rows).toEqual([
      { key: 'apiUrl', value: 'https://api.example.com' },
      { key: 'timeout', value: '5000' },
      { key: 'debug', value: 'true' },
    ]);
  });

  it('should handle empty config object', () => {
    const wrapper = mount(Configuration, {
      props: {
        config: {},
      },
    });

    const table = wrapper.findComponent({ name: 'q-table' });
    const rows = table.props('rows');
    expect(rows).toEqual([]);
  });

  it('should have correct column configuration', () => {
    const wrapper = mount(Configuration, {
      props: {
        config: { key: 'value' },
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
