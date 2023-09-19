import {
  CommandBar,
  ICommandBarItemProps,
  initializeIcons,
  Pivot,
  PivotItem,
  Stack,
} from '@fluentui/react';
import { useEffect, useMemo, useState } from 'react';
import '../node_modules/@fluentui/react/dist/css/fabric.min.css';
import BuildInfo from './BuildInfo';
import Extension from './Extension';
import Extensions from './Extensions';
import ServerInfo from './ServerInfo';
import type { KeyedNavLink } from './types';
import { isExtensionInfo } from './utils';

initializeIcons();

const enum Environment {
  Public = 'https://hosting.portal.azure.net/api/diagnostics',
  Fairfax = 'https://hosting.azureportal.usgovcloudapi.net/api/diagnostics',
  Mooncake = 'https://hosting.azureportal.chinacloudapi.cn/api/diagnostics',
}

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public
  );

  const environmentName = useMemo(() => {
    switch (environment) {
      case Environment.Public:
        return 'Public Cloud';
      case Environment.Fairfax:
        return 'Fairfax';
      case Environment.Mooncake:
        return 'Mooncake';
      default:
        return 'Select environment';
    }
  }, [environment]);

  const environments = useMemo<ICommandBarItemProps[]>(
    () => [
      {
        key: 'environment',
        subMenuProps: {
          items: [
            {
              key: 'public',
              canCheck: true,
              checked: environment === Environment.Public,
              onClick: () => {
                setEnvironment(Environment.Public);
                setExtension(undefined);
              },
              text: 'Public Cloud',
            },
            {
              key: 'fairfax',
              canCheck: true,
              checked: environment === Environment.Fairfax,
              onClick: () => {
                setEnvironment(Environment.Fairfax);
                setExtension(undefined);
              },
              text: 'Fairfax',
            },
            {
              key: 'mooncake',
              canCheck: true,
              checked: environment === Environment.Mooncake,
              onClick: () => {
                setEnvironment(Environment.Mooncake);
                setExtension(undefined);
              },
              text: 'Mooncake',
            },
          ],
        },
        text: environmentName,
      },
    ],
    [environment, environmentName]
  );

  useEffect(() => {
    const getDiagnostics = async () => {
      const response = await fetch(environment);
      setDiagnostics(await response.json());
    };

    getDiagnostics();
  }, [environment]);

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
    <>
      <CommandBar items={environments} />
      <Pivot>
        <PivotItem headerText="Extensions">
          <Stack horizontal tokens={{ childrenGap: '1rem' }}>
            <Stack.Item>
              <Extensions
                extensions={extensions}
                onLinkClick={handleLinkClick}
              />
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
    </>
  );
};

export default App;
