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

    const table = wrapper.findComponent({ name: 'q-markup-table' });
    expect(table.exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(3);

    // Check first row
    const firstRowCells = rows[0]?.findAll('td');
    expect(firstRowCells?.[0]?.text()).toBe('apiUrl');
    expect(firstRowCells?.[1]?.text()).toBe('https://api.example.com');

    // Check second row
    const secondRowCells = rows[1]?.findAll('td');
    expect(secondRowCells?.[0]?.text()).toBe('timeout');
    expect(secondRowCells?.[1]?.text()).toBe('5000');

    // Check third row
    const thirdRowCells = rows[2]?.findAll('td');
    expect(thirdRowCells?.[0]?.text()).toBe('debug');
    expect(thirdRowCells?.[1]?.text()).toBe('true');
  });

  it('should handle empty config object', () => {
    const wrapper = mount(Configuration, {
      props: {
        config: {},
      },
    });

    const table = wrapper.findComponent({ name: 'q-markup-table' });
    expect(table.exists()).toBe(true);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(0);
  });

  it('should have correct table headers', () => {
    const wrapper = mount(Configuration, {
      props: {
        config: { key: 'value' },
      },
    });

    const table = wrapper.findComponent({ name: 'q-markup-table' });
    expect(table.exists()).toBe(true);

    const headers = wrapper.findAll('thead th');
    expect(headers).toHaveLength(2);
    expect(headers[0]?.text()).toBe('Key');
    expect(headers[1]?.text()).toBe('Value');
  });
});
