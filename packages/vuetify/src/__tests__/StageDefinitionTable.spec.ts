import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StageDefinitionTable from '../StageDefinitionTable.vue'

describe('StageDefinitionTable', () => {
  it('renders stage definitions', () => {
    const stageDefinition = {
      build: ['compile', 'link'],
      test: ['unit', 'integration'],
    }
    const wrapper = mount(StageDefinitionTable, {
      props: { stageDefinition },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
