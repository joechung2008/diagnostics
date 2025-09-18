import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Configuration from './Configuration.svelte';

describe('Configuration', () => {
	it('renders config table', () => {
		const config = { foo: 'bar', baz: 'qux' };
		const { getByText } = render(Configuration, { props: { config } });
		expect(getByText('Key')).toBeInTheDocument();
		expect(getByText('Value')).toBeInTheDocument();
		expect(getByText('foo')).toBeInTheDocument();
		expect(getByText('bar')).toBeInTheDocument();
		expect(getByText('baz')).toBeInTheDocument();
		expect(getByText('qux')).toBeInTheDocument();
	});
});
