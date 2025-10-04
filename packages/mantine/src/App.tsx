import {
  Button,
  Group,
  Loader,
  Menu,
  Notification,
  Tabs,
  TabsList,
  TabsTab,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
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
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public
  );
  const [selectedTab, setSelectedTab] = useState<string>("extensions");
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR<Diagnostics>(environment, async (environment: string) => {
    const response = await fetch(environment);
    if (!response.ok) {
      throw new Error(`Error fetching diagnostics: ${response.statusText}`);
    }

    return response.json();
  });

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
          setSelectedTab("extensions");
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === Environment.Fairfax,
        onClick: () => {
          setEnvironment(Environment.Fairfax);
          setExtension(undefined);
          setSelectedTab("extensions");
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === Environment.Mooncake,
        onClick: () => {
          setEnvironment(Environment.Mooncake);
          setExtension(undefined);
          setSelectedTab("extensions");
        },
      },
    ],
    [environment]
  );

  const handleLinkClick = useCallback(
    (_?: React.MouseEvent, item?: KeyedNavLink) => {
      if (item) {
        const extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo(extension)) {
          setExtension(extension);
        }
      }
    },
    [diagnostics?.extensions]
  );

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
        <Activity mode={showPaasServerless ? "visible" : "hidden"}>
          <Button
            key="paasserverless"
            size="sm"
            variant="subtle"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
                setSelectedTab("extensions");
              }
            }}
          >
            <Text>paasserverless</Text>
          </Button>
        </Activity>
        <Button
          key="websites"
          size="sm"
          variant="subtle"
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
              setSelectedTab("extensions");
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
      <Activity mode={!error && isLoading ? "visible" : "hidden"}>
        <div className="tab-panel centered">
          <Loader aria-label="Loading..." type="bars" />
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        <div className="tab-panel centered">
          <Notification
            color="red"
            icon={<IconX size={20} />}
            title="Error"
            withBorder
            withCloseButton={false}
          >
            {error?.message ?? "Unknown error"}
          </Notification>
        </div>
      </Activity>
      <Activity
        mode={
          !error && !isLoading && selectedTab === "extensions"
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.extensions && (
          <div id="extensions-tab" className="tab-panel">
            <div className="stack">
              <Extensions
                extensions={diagnostics.extensions}
                onLinkClick={handleLinkClick}
              />
              {extension && <Extension {...extension} />}
            </div>
          </div>
        )}
      </Activity>
      <Activity
        mode={
          !error && !isLoading && selectedTab === "build" ? "visible" : "hidden"
        }
      >
        {diagnostics?.buildInfo && (
          <div id="build-tab" className="tab-panel">
            <BuildInfo {...diagnostics.buildInfo} />
          </div>
        )}
      </Activity>
      <Activity
        mode={
          !error && !isLoading && selectedTab === "server"
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.serverInfo && (
          <div id="server-tab" className="tab-panel">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
