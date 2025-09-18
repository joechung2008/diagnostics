import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import StageDefinition from './StageDefinition.svelte';

describe('StageDefinition component', () => {
	it('renders stage entries', () => {
		const stageDefinition = { s1: ['a', 'b'], s2: ['c'] };
		const { getByText } = render(StageDefinition, { stageDefinition });
		expect(getByText('Stage Definitions')).toBeTruthy();
		expect(getByText('s1')).toBeTruthy();
		expect(getByText('a, b')).toBeTruthy();
	});
});
