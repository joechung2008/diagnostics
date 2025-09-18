import { render, screen, fireEvent } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Extensions from './Extensions.svelte';

afterEach(() => {
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('Extensions', () => {
	it('renders links for extensions and calls onLinkClick when clicked', async () => {
		const mockOnClick = vi.fn();
		// use ExtensionInfo-shaped objects so isExtensionInfo filter passes
		const extensions = {
			ext1: { extensionName: 'First' },
			ext2: { extensionName: 'Second' }
		};

		render(Extensions, { extensions, onLinkClick: mockOnClick });

		expect(screen.getByText('First')).toBeInTheDocument();
		expect(screen.getByText('Second')).toBeInTheDocument();

		const first = screen.getByText('First');
		await fireEvent.click(first);
		expect(mockOnClick).toHaveBeenCalled();
	});
});
