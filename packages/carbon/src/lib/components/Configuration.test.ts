import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Configuration from './Configuration.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('Configuration', () => {
	it('renders configuration key/value rows', () => {
		const config = { alpha: '1', beta: 'two' };
		render(Configuration, { config });

		expect(screen.getByText('Configuration')).toBeInTheDocument();
		expect(screen.getByText('alpha')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('beta')).toBeInTheDocument();
		expect(screen.getByText('two')).toBeInTheDocument();
	});
});
