import { render } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Extensions from './Extensions.svelte';

describe('Extensions', () => {
	it('renders extension links', () => {
		const extensions = {
			ext1: { extensionName: 'Ext1' },
			ext2: { extensionName: 'Ext2' }
		};
		const { getByText } = render(Extensions, {
			props: {
				extensions,
				onLinkClick: () => {}
			}
		});
		expect(getByText('Ext1')).toBeInTheDocument();
		expect(getByText('Ext2')).toBeInTheDocument();
	});

	it('calls onLinkClick when an extension link is clicked', async () => {
		const extensions = {
			ext1: { extensionName: 'Ext1' },
			ext2: { extensionName: 'Ext2' }
		};
		const onLinkClick = vi.fn();
		const { getByText } = render(Extensions, {
			props: { extensions, onLinkClick }
		});
		const ext1 = getByText('Ext1');
		ext1.click();
		expect(onLinkClick).toHaveBeenCalled();
	});
});
