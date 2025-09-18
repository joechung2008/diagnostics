import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Extension from './Extension.svelte';

describe('Extension', () => {
	it('renders extension name', () => {
		const props = { extensionName: 'MyExtension' };
		const { getByText } = render(Extension, { props });
		expect(getByText('MyExtension')).toBeInTheDocument();
	});

	it('renders Configuration and StageDefinition if provided', () => {
		const props = {
			extensionName: 'MyExtension',
			config: { foo: 'bar' },
			stageDefinition: { stage: ['step1', 'step2'] }
		};
		const { getByText } = render(Extension, { props });
		expect(getByText('Configuration')).toBeInTheDocument();
		expect(getByText('Stage Definitions')).toBeInTheDocument();
	});
});
