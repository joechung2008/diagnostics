import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Layout from './+layout.svelte';

// Mock $lib to prevent async tasks
vi.mock('$lib', () => ({ reportWebVitals: vi.fn() }));

describe('Layout', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.resetModules();
	});

	it('sets the document title', () => {
		render(Layout);
		expect(document.title).toBe('Azure Portal Extensions Dashboard');
	});

	it('sets the favicon', () => {
		render(Layout);
		const favicon = document.querySelector('link[rel="icon"]');
		expect(favicon?.getAttribute('href')).toContain('favicon.ico');
	});

	it('sets the description meta tag', () => {
		render(Layout);
		const description = document.querySelector('meta[name="description"]');
		expect(description?.getAttribute('content')).toBe(
			'Information about extensions on the Azure portal'
		);
	});
});
