import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Configuration from './Configuration.svelte';

describe('Configuration component', () => {
	it('renders configuration entries', () => {
		const config = { key1: 'value1', key2: 'value2' };
		const { getByText } = render(Configuration, { config });
		expect(getByText('Configuration')).toBeTruthy();
		expect(getByText('key1')).toBeTruthy();
		expect(getByText('value1')).toBeTruthy();
	});
});
