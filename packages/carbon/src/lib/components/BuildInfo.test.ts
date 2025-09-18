import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BuildInfo from './BuildInfo.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('BuildInfo', () => {
	it('renders the build version row', () => {
		render(BuildInfo, { buildVersion: '1.2.3' });

		expect(screen.getByText('Build Version')).toBeInTheDocument();
		expect(screen.getByText('1.2.3')).toBeInTheDocument();
	});
});
