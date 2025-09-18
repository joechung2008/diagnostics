import { render } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Layout from './+layout.svelte';

describe('root layout', () => {
	beforeEach(() => {
		vi.mock('$lib', () => ({ reportWebVitals: vi.fn() }));
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('sets the document title', () => {
		render(Layout);
		expect(document.title).toBe('Azure Portal Extensions Dashboar');
	});

	it('adds a meta description with expected content', () => {
		render(Layout);
		const meta = document.querySelector('meta[name="description"]');
		expect(meta).toBeTruthy();
		expect(meta?.getAttribute('content')).toBe(
			'Information about extensions in the Azure portal'
		);
	});

	it('includes a favicon link element', () => {
		render(Layout);
		const link = document.querySelector('link[rel="icon"]');
		expect(link).toBeTruthy();
	});
});
