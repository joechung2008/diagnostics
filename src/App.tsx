import { initializeIcons, Pivot, PivotItem, Stack } from '@fluentui/react';
import { useEffect, useState } from 'react';
import '../node_modules/@fluentui/react/dist/css/fabric.min.css';
import BuildInfo from './BuildInfo';
import Extension from './Extension';
import Extensions from './Extensions';
import ServerInfo from './ServerInfo';
import type { KeyedNavLink } from './types';
import { isExtensionInfo } from './utils';

initializeIcons();

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();

  useEffect(() => {
    const getDiagnostics = async () => {
      const response = await fetch(
        'https://ema.hosting.portal.azure.net/api/diagnostics'
      );
      setDiagnostics(await response.json());
    };

    getDiagnostics();
  }, []);

  if (!diagnostics) {
    return null;
  }

  const { buildInfo, extensions, serverInfo } = diagnostics;

  const handleLinkClick = (_?: React.MouseEvent, item?: KeyedNavLink) => {
    if (item) {
      const extension = extensions[item.key];
      if (isExtensionInfo(extension)) {
        setExtension(extension);
      }
    }
  };

  return (
    <Pivot>
      <PivotItem headerText="Extensions">
        <Stack horizontal tokens={{ childrenGap: '1rem' }}>
          <Stack.Item>
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
          </Stack.Item>
          <Stack.Item grow>
            {extension && <Extension {...extension} />}
          </Stack.Item>
        </Stack>
      </PivotItem>
      <PivotItem headerText="Build Information">
        <BuildInfo {...buildInfo} />
      </PivotItem>
      <PivotItem headerText="Server Information">
        <ServerInfo {...serverInfo} />
      </PivotItem>
    </Pivot>
  );
};

export default App;
