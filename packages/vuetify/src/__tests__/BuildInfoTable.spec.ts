// BuildInfoTable.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BuildInfoTable from '../BuildInfoTable.vue'

describe('BuildInfoTable', () => {
  it('renders without crashing', () => {
    const wrapper = mount(BuildInfoTable, {
      props: {
        buildVersion: '1.0.0',
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
