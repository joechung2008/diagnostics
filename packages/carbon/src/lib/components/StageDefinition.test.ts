import { render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import StageDefinition from './StageDefinition.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('StageDefinition', () => {
	it('renders stage definition entries joined by comma', () => {
		const stageDefinition = { build: ['a', 'b'], test: ['x'] };
		render(StageDefinition, { stageDefinition });

		expect(screen.getByText('Stage Definition')).toBeInTheDocument();
		expect(screen.getByText('a, b')).toBeInTheDocument();
		expect(screen.getByText('x')).toBeInTheDocument();
	});
});
