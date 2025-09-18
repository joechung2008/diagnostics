import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import BuildInfo from './BuildInfo.svelte';

describe('BuildInfo component', () => {
	it('renders build version', () => {
		const { getByText } = render(BuildInfo, { buildVersion: '1.2.3' });
		expect(getByText('Build Version')).toBeTruthy();
		expect(getByText('1.2.3')).toBeTruthy();
	});
});
