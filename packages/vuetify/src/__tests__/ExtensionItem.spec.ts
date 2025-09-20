// ExtensionItem.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExtensionItem from '../ExtensionItem.vue'

describe('ExtensionItem', () => {
  it('renders extension name and config', () => {
    const wrapper = mount(ExtensionItem, {
      props: {
        extensionName: 'Test Extension',
        managedSdpEnabled: false,
        config: {
          foo: 'bar',
          baz: 'qux',
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders SDP enabled badge when managedSdpEnabled is true', () => {
    const wrapper = mount(ExtensionItem, {
      props: {
        extensionName: 'Test Extension',
        managedSdpEnabled: true,
        config: {
          foo: 'bar',
          baz: 'qux',
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('does not render SDP badge when managedSdpEnabled is false', () => {
    const wrapper = mount(ExtensionItem, {
      props: {
        extensionName: 'Test Extension',
        managedSdpEnabled: false,
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
