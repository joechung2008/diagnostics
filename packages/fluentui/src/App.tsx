import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  type MenuCheckedValueChangeData,
  type MenuCheckedValueChangeEvent,
} from "@fluentui/react-components";
import { startTransition, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

type Environment = (typeof Environment)[keyof typeof Environment];

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

function getEnvironnmentName(environment: Environment | undefined): string {
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
}

const App: React.FC = () => {
  const [environments, setEnvironments] = useState<
    Record<string, Environment[]>
  >({
    environment: [Environment.Public],
  });
  const environment = useMemo<Environment>(
    () => environments.environment[0],
    [environments.environment]
  );
  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(
    environment,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
      }
      return response.json();
    },
    {
      suspense: true,
    }
  );

  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const handleLinkClick: ExtensionsProps["onLinkClick"] = useCallback(
    (_, item) => {
      if (item) {
        const $extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo($extension)) {
          setExtension($extension);
        }
      }
    },
    [diagnostics?.extensions]
  );

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environmentName = useMemo(
    () => getEnvironnmentName(environment),
    [environment]
  );

  const handleEnvironmentChange = useCallback(
    (_: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => {
      if (data.checkedItems?.length ?? 0 > 0) {
        startTransition(() => {
          setEnvironments((previous) => ({
            ...previous,
            [data.name]: data.checkedItems as Environment[],
          }));
          setExtension(undefined);
        });
      }
    },
    []
  );

  if (isLoading) {
    return <div>Loading diagnostics...</div>;
  }

  if (error) {
    return <div>Error loading diagnostics: {error.message}</div>;
  }

  if (!diagnostics) {
    return null;
  }

  return (
    <div className="flexbox">
      <Toolbar>
        <Menu
          checkedValues={environments}
          onCheckedValueChange={handleEnvironmentChange}
        >
          <MenuTrigger disableButtonEnhancement>
            <MenuButton>{environmentName}</MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Object.entries(Environment).map(([key, value]) => (
                <MenuItemRadio key={key} name="environment" value={value}>
                  {getEnvironnmentName(value)}
                </MenuItemRadio>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
        {showPaasServerless && (
          <ToolbarButton
            key="paasserverless"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
              }
            }}
          >
            paasserverless
          </ToolbarButton>
        )}
        <ToolbarButton
          key="websites"
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
            }
          }}
        >
          websites
        </ToolbarButton>
      </Toolbar>
      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as string)}
      >
        <Tab value="extensions">Extensions</Tab>
        <Tab value="build">Build Information</Tab>
        <Tab value="server">Server Information</Tab>
      </TabList>
      {selectedTab === "extensions" && diagnostics?.extensions && (
        <div className="tab-panel">
          <div className="stack">
            <Extensions
              extensions={diagnostics.extensions}
              onLinkClick={handleLinkClick}
            />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && diagnostics?.buildInfo && (
        <div className="tab-panel">
          <BuildInfo {...diagnostics.buildInfo} />
        </div>
      )}
      {selectedTab === "server" && diagnostics?.serverInfo && (
        <div className="tab-panel">
          <ServerInfo {...diagnostics.serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
