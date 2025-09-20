import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorNotFound from './ErrorNotFound.vue';

describe('ErrorNotFound', () => {
  it('should render 404 text', () => {
    const wrapper = mount(ErrorNotFound);

    expect(wrapper.text()).toContain('404');
    expect(wrapper.text()).toContain('Oops. Nothing here...');
  });

  it('should render go home button', () => {
    const wrapper = mount(ErrorNotFound);

    const button = wrapper.findComponent({ name: 'q-btn' });
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Go Home');
    expect(button.props('to')).toBe('/');
  });

  it('should have fullscreen layout', () => {
    const wrapper = mount(ErrorNotFound);

    const container = wrapper.find('.fullscreen');
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain('bg-blue');
    expect(container.classes()).toContain('text-white');
    expect(container.classes()).toContain('text-center');
    expect(container.classes()).toContain('q-pa-md');
    expect(container.classes()).toContain('flex');
    expect(container.classes()).toContain('flex-center');
  });
});
