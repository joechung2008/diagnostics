import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Extension from './Extension.svelte';

describe('Extension component', () => {
	it('renders extension name', () => {
		const { getByText } = render(Extension, { extensionName: 'MyExt' });
		expect(getByText('MyExt')).toBeTruthy();
	});

	it('renders Configuration and StageDefinition when provided', () => {
		const props: ExtensionInfo = {
			extensionName: 'MyExt',
			config: { foo: 'bar' },
			stageDefinition: { build: ['a', 'b'] }
		};

		const { getByText } = render(Extension, props);

		// Configuration
		expect(getByText('Configuration')).toBeTruthy();
		expect(getByText('foo')).toBeTruthy();
		expect(getByText('bar')).toBeTruthy();

		// StageDefinition
		expect(getByText('Stage Definitions')).toBeTruthy();
		expect(getByText('build')).toBeTruthy();
		expect(getByText('a, b')).toBeTruthy();
	});
});
