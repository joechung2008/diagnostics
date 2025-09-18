// ConfigurationTable.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfigurationTable from '../ConfigurationTable.vue'

describe('ConfigurationTable', () => {
  it('renders configuration items', () => {
    const config = {
      apiUrl: 'https://example.com',
      timeout: '5000',
    }
    const wrapper = mount(ConfigurationTable, {
      props: { config },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
