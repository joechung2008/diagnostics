// ExtensionItem.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExtensionItem from '../ExtensionItem.vue'

describe('ExtensionItem', () => {
  it('renders extension name and config', () => {
    const wrapper = mount(ExtensionItem, {
      props: {
        extensionName: 'Test Extension',
        config: {
          foo: 'bar',
          baz: 'qux',
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
