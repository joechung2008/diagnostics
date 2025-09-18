import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StageDefinition from './StageDefinition.svelte';

describe('StageDefinition', () => {
	it('renders stage definitions table', () => {
		const stageDefinition = {
			build: ['compile', 'test'],
			deploy: ['upload', 'restart']
		};
		const { getByText } = render(StageDefinition, {
			props: { stageDefinition }
		});
		expect(getByText('Stage Definitions')).toBeInTheDocument();
		expect(getByText('build')).toBeInTheDocument();
		expect(getByText('compile, test')).toBeInTheDocument();
		expect(getByText('deploy')).toBeInTheDocument();
		expect(getByText('upload, restart')).toBeInTheDocument();
	});
});
