// ExtensionItems.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ExtensionItems from '../ExtensionItems.vue'

describe('ExtensionItems', () => {
  it('renders extension buttons', () => {
    const extensions = {
      ext1: { extensionName: 'Alpha' },
      ext2: { extensionName: 'Beta' },
    }
    const onLinkClick = vi.fn()
    const wrapper = mount(ExtensionItems, {
      props: { extensions, onLinkClick },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
