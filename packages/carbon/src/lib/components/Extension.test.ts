import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Extension from './Extension.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('Extension', () => {
	it('renders extension name and optional children', () => {
		const props = { extensionName: 'MyExt', config: { a: 'b' }, stageDefinition: { s: ['x'] } };
		render(Extension, props);

		expect(screen.getByText('MyExt')).toBeInTheDocument();
		// configuration heading from Configuration.svelte
		expect(screen.getByText('Configuration')).toBeInTheDocument();
		// stage definition heading
		expect(screen.getByText('Stage Definition')).toBeInTheDocument();
	});
});
