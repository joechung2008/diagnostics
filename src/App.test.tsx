import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const mockDiagnostics = {
  buildInfo: { buildVersion: '1.2.3' },
  extensions: {
    websites: { extensionName: 'websites' },
    paasserverless: { extensionName: 'paasserverless' },
  },
  serverInfo: {
    deploymentId: 'deploy-123',
    extensionSync: { totalSyncAllCount: 42 },
    hostname: 'server.example.com',
    nodeVersions: 'v18.0.0',
    serverId: 'srv-456',
    uptime: 172800,
  },
};

const mockDiagnosticsNoPaas = {
  ...mockDiagnostics,
  extensions: {
    websites: { extensionName: 'websites' },
  },
};

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders after a mocked fetch resolves', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnostics),
    });
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    render(<App />);

    // Wait for the component to render after the fetch completes
    await screen.findByRole('button', { name: 'Public Cloud' });

    // Verify key UI elements that should be present post-fetch
    expect(screen.getByRole('tab', { name: 'Extensions' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Build Information' })).toBeTruthy();
    expect(
      screen.getByRole('tab', { name: 'Server Information' })
    ).toBeTruthy();

    // Ensure extension-related toolbar buttons render (disambiguate using the toolbar container)
    const toolbar = screen.getByRole('toolbar');
    expect(
      within(toolbar).getByRole('button', { name: 'websites' })
    ).toBeTruthy();
    expect(
      within(toolbar).getByRole('button', { name: 'paasserverless' })
    ).toBeTruthy();
  });

  it('switches environments via menu, resets selected extension, and refetches diagnostics', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnostics),
    });
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    render(<App />);

    await screen.findByRole('button', { name: 'Public Cloud' });

    const toolbar = screen.getByRole('toolbar');

    // Count baseline occurrences of "websites" (toolbar + nav list)
    const baselineCount = screen.getAllByText('websites').length;

    // Select the "websites" extension via toolbar
    await user.click(within(toolbar).getByRole('button', { name: 'websites' }));

    // Expect an additional occurrence from the Extension details panel
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineCount + 1);
    });

    // Open environment menu and select "Mooncake"
    await user.click(screen.getByRole('button', { name: 'Public Cloud' }));
    await user.click(screen.getByRole('menuitemradio', { name: 'Mooncake' }));

    // Verify refetch with Mooncake endpoint
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics'
    );

    // Extension selection should be cleared immediately on environment change
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineCount);
    });
  });

  it('hides the paasserverless toolbar button when that extension is not present', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnosticsNoPaas),
    });
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    render(<App />);

    await screen.findByRole('button', { name: 'Public Cloud' });

    const toolbar = screen.getByRole('toolbar');

    // "websites" is present, "paasserverless" should be hidden
    expect(
      within(toolbar).getByRole('button', { name: 'websites' })
    ).toBeTruthy();
    expect(
      within(toolbar).queryByRole('button', { name: 'paasserverless' })
    ).toBeNull();
  });

  it('selects an extension from the navigation list and shows its details', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockDiagnostics),
      }) as unknown as typeof fetch
    );

    render(<App />);

    await screen.findByRole('button', { name: 'Public Cloud' });

    const nav = screen.getByRole('navigation', { name: 'Extensions' });

    // Baseline occurrences (toolbar + nav)
    const baselineCount = screen.getAllByText('websites').length;

    // Click the extension in the nav list
    await user.click(within(nav).getByRole('button', { name: 'websites' }));

    // Expect one more "websites" from the details panel
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineCount + 1);
    });
  });

  it('navigates tabs and renders Build and Server info tables', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockDiagnostics),
      }) as unknown as typeof fetch
    );

    render(<App />);

    await screen.findByRole('button', { name: 'Public Cloud' });

    // Switch to Build Information tab and verify table
    await user.click(screen.getByRole('tab', { name: 'Build Information' }));
    expect(screen.getByRole('table', { name: 'Build Info' })).toBeTruthy();

    // Switch to Server Information tab and verify table
    await user.click(screen.getByRole('tab', { name: 'Server Information' }));
    expect(screen.getByRole('table', { name: 'Server Info' })).toBeTruthy();
  });

  it('selects the paasserverless extension via toolbar and shows its details', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockDiagnostics),
      }) as unknown as typeof fetch
    );

    render(<App />);

    await screen.findByRole('button', { name: 'Public Cloud' });

    const toolbar = screen.getByRole('toolbar');

    const baselineCount = screen.getAllByText('paasserverless').length;

    await user.click(
      within(toolbar).getByRole('button', { name: 'paasserverless' })
    );

    await waitFor(() => {
      expect(screen.getAllByText('paasserverless').length).toBe(
        baselineCount + 1
      );
    });
  });

  it('switches to Fairfax and back to Public via menu, refetches, updates label, and clears selection', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockDiagnostics),
    });
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    render(<App />);

    // Initial environment label
    await screen.findByRole('button', { name: 'Public Cloud' });

    const toolbar = screen.getByRole('toolbar');

    // Choose an extension to ensure it gets cleared on env change
    const baselineWebsites = screen.getAllByText('websites').length;
    await user.click(within(toolbar).getByRole('button', { name: 'websites' }));
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineWebsites + 1);
    });

    // Switch to Fairfax
    await user.click(screen.getByRole('button', { name: 'Public Cloud' }));
    await user.click(screen.getByRole('menuitemradio', { name: 'Fairfax' }));
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics'
    );
    // Label updates to Fairfax
    await screen.findByRole('button', { name: 'Fairfax' });
    // Selection cleared
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineWebsites);
    });

    // Choose again then switch back to Public
    await user.click(within(toolbar).getByRole('button', { name: 'websites' }));
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineWebsites + 1);
    });

    await user.click(screen.getByRole('button', { name: 'Fairfax' }));
    await user.click(
      screen.getByRole('menuitemradio', { name: 'Public Cloud' })
    );
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://hosting.portal.azure.net/api/diagnostics'
    );
    await screen.findByRole('button', { name: 'Public Cloud' });
    await waitFor(() => {
      expect(screen.getAllByText('websites').length).toBe(baselineWebsites);
    });
  });
});
