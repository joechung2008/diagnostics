import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Extensions from './Extensions.svelte';

describe('Extensions component', () => {
	it('renders a list of extension links and calls onLinkClick when clicked', async () => {
		const extensions: Record<string, Extension> = {
			extA: { extensionName: 'extA' },
			extB: { extensionName: 'extB' }
		};

		const onLinkClick = vi.fn();

		const { getByText } = render(Extensions, { extensions, onLinkClick });

		// The Navigation.Tile renders the name
		expect(getByText('extA')).toBeTruthy();
		expect(getByText('extB')).toBeTruthy();

		// Simulate click on one of the tiles
		await fireEvent.click(getByText('extA'));
		expect(onLinkClick).toHaveBeenCalled();
	});
});
