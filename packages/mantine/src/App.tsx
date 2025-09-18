import {
  Button,
  Group,
  Menu,
  Tabs,
  TabsList,
  TabsTab,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type Environment = (typeof Environment)[keyof typeof Environment];

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public
  );
  const [selectedTab, setSelectedTab] = useState<string>("extensions");
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const environmentName = useMemo(() => {
    switch (environment) {
      case Environment.Public:
        return "Public Cloud";
      case Environment.Fairfax:
        return "Fairfax";
      case Environment.Mooncake:
        return "Mooncake";
      default:
        return "Select environment";
    }
  }, [environment]);

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environments = useMemo(
    () => [
      {
        key: "public",
        text: "Public Cloud",
        selected: environment === Environment.Public,
        onClick: () => {
          setEnvironment(Environment.Public);
          setExtension(undefined);
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === Environment.Fairfax,
        onClick: () => {
          setEnvironment(Environment.Fairfax);
          setExtension(undefined);
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === Environment.Mooncake,
        onClick: () => {
          setEnvironment(Environment.Mooncake);
          setExtension(undefined);
        },
      },
    ],
    [environment]
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
    <div className="flexbox">
      <Group>
        <Menu opened={menuOpened} onChange={setMenuOpened}>
          <Menu.Target>
            <Button>
              <Text size="sm">{environmentName}&nbsp;</Text>
              <ThemeIcon className={`chevron-icon ${menuOpened ? "flip" : ""}`}>
                <IconChevronDown />
              </ThemeIcon>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {environments.map((env) => (
              <Menu.Item key={env.key} onClick={env.onClick}>
                {env.text}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        {showPaasServerless && (
          <Button
            key="paasserverless"
            size="sm"
            variant="subtle"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
              }
            }}
          >
            <Text>paasserverless</Text>
          </Button>
        )}
        <Button
          key="websites"
          size="sm"
          variant="subtle"
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
            }
          }}
        >
          <Text>websites</Text>
        </Button>
      </Group>
      <Tabs
        value={selectedTab}
        onChange={(value) => value && setSelectedTab(value)}
      >
        <TabsList>
          <TabsTab aria-controls="extensions-tab" value="extensions">
            Extensions
          </TabsTab>
          <TabsTab aria-controls="build-tab" value="build">
            Build Information
          </TabsTab>
          <TabsTab aria-controls="server-tab" value="server">
            Server Information
          </TabsTab>
        </TabsList>
      </Tabs>
      {selectedTab === "extensions" && (
        <div id="extensions-tab" className="tab-panel">
          <div className="stack">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && (
        <div id="build-tab" className="tab-panel">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div id="server-tab" className="tab-panel">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
