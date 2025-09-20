import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Extensions from './Extensions.vue';
import type { ExtensionInfo, ExtensionError } from './models';

describe('Extensions', () => {
  const mockExtensions = {
    ext1: {
      extensionName: 'Extension A',
      config: { enabled: 'true' },
    } as ExtensionInfo,
    ext2: {
      extensionName: 'Extension B',
      stageDefinition: { stage1: ['step1'] },
    } as ExtensionInfo,
    ext3: {
      lastError: {
        errorMessage: 'Failed to load',
        time: '2023-01-01T00:00:00Z',
      },
    } as ExtensionError,
  };

  it('should render extensions list with correct aria label', () => {
    const wrapper = mount(Extensions, {
      props: {
        extensions: mockExtensions,
        onLinkClick: vi.fn(),
      },
    });

    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
    expect(nav.classes()).toContain('extensions');

    const list = wrapper.findComponent({ name: 'q-list' });
    expect(list.exists()).toBe(true);
    expect(list.attributes('aria-label')).toBe('Extensions');
  });

  it('should filter out ExtensionError and display ExtensionInfo as items', () => {
    const wrapper = mount(Extensions, {
      props: {
        extensions: mockExtensions,
        onLinkClick: vi.fn(),
      },
    });

    const items = wrapper.findAllComponents({ name: 'q-item' });
    expect(items).toHaveLength(2); // Only ExtensionInfo items, not ExtensionError

    const itemTexts = items.map((item) => item.text());
    expect(itemTexts).toContain('Extension A');
    expect(itemTexts).toContain('Extension B');
  });

  it('should sort extensions by key', () => {
    const unsortedExtensions = {
      z: { extensionName: 'Z Extension' } as ExtensionInfo,
      a: { extensionName: 'A Extension' } as ExtensionInfo,
      m: { extensionName: 'M Extension' } as ExtensionInfo,
    };

    const wrapper = mount(Extensions, {
      props: {
        extensions: unsortedExtensions,
        onLinkClick: vi.fn(),
      },
    });

    const items = wrapper.findAllComponents({ name: 'q-item' });
    const itemTexts = items.map((item) => item.text());
    expect(itemTexts[0]).toContain('A Extension');
    expect(itemTexts[1]).toContain('M Extension');
    expect(itemTexts[2]).toContain('Z Extension');
  });

  it('should call onLinkClick when item is clicked', async () => {
    const onLinkClick = vi.fn();
    const wrapper = mount(Extensions, {
      props: {
        extensions: { ext1: mockExtensions.ext1 },
        onLinkClick,
      },
    });

    const item = wrapper.findComponent({ name: 'q-item' });
    await item.trigger('click');

    expect(onLinkClick).toHaveBeenCalledTimes(1);
    expect(onLinkClick).toHaveBeenCalledWith({
      key: 'Extension A',
      name: 'Extension A',
      url: '',
    });
  });

  it('should handle empty extensions object', () => {
    const wrapper = mount(Extensions, {
      props: {
        extensions: {},
        onLinkClick: vi.fn(),
      },
    });

    const items = wrapper.findAllComponents({ name: 'q-item' });
    expect(items).toHaveLength(0);
  });
});
