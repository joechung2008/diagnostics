import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MainLayout from './MainLayout.vue';

describe('MainLayout', () => {
  it('should render q-layout with correct view', () => {
    const wrapper = mount(MainLayout);

    // Check if q-layout is rendered with correct view
    const layout = wrapper.findComponent({ name: 'q-layout' });
    expect(layout.exists()).toBe(true);
    expect(layout.props('view')).toBe('lHh Lpr lFf');
  });

  it('should render q-page-container with router-view', () => {
    const wrapper = mount(MainLayout);

    // Check if q-page-container is rendered
    const pageContainer = wrapper.findComponent({ name: 'q-page-container' });
    expect(pageContainer.exists()).toBe(true);

    // Check if router-view is inside the page container
    const routerView = pageContainer.findComponent({ name: 'router-view' });
    expect(routerView.exists()).toBe(true);
  });
});
