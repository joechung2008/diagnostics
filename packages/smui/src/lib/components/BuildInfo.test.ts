import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import BuildInfo from './BuildInfo.svelte';

describe('BuildInfo', () => {
	it('renders build version', () => {
		const { getByText } = render(BuildInfo, {
			props: { buildVersion: '1.2.3' }
		});
		expect(getByText('Build Version')).toBeInTheDocument();
		expect(getByText('1.2.3')).toBeInTheDocument();
	});
});
