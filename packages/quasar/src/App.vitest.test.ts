import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('should render router-view', () => {
    const wrapper = mount(App);

    // Check if router-view is rendered
    const routerView = wrapper.findComponent({ name: 'router-view' });
    expect(routerView.exists()).toBe(true);
  });
});
