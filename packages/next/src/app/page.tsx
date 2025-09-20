"use client";

import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MessageBar,
  Spinner,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  type MenuCheckedValueChangeData,
  type MenuCheckedValueChangeEvent,
} from "@fluentui/react-components";
import { useReportWebVitals } from "next/web-vitals";
import { startTransition, useState } from "react";
import useSWR from "swr";
import BuildInfo from "../BuildInfo";
import Extension from "../Extension";
import Extensions from "../Extensions";
import ServerInfo from "../ServerInfo";
import { fetchDiagnostics, isExtensionInfo } from "../utils";

type Environment = (typeof Environment)[keyof typeof Environment];

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

function getEnvironmentName(environment: Environment): string {
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
  useReportWebVitals(console.log);

  const [extension, setExtension] = useState<ExtensionInfo>();

  const [environments, setEnvironments] = useState<{
    environment: Environment[];
  }>({
    environment: [Environment.Public],
  });

  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const environment = environments.environment?.[0];

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(environment, fetchDiagnostics);

  const environmentName = getEnvironmentName(environment);

  const showPaasServerless = isExtensionInfo(
    diagnostics?.extensions["paasserverless"]
  );

  const handleEnvironmentChange = (
    _: MenuCheckedValueChangeEvent,
    { checkedItems, name }: MenuCheckedValueChangeData
  ) => {
    if (checkedItems.length > 0) {
      setExtension(undefined);

      startTransition(() => {
        setEnvironments((previous) => ({
          ...previous,
          [name]: checkedItems as Environment[],
        }));
      });
    }
  };

  const handleLinkClick = (_?: React.MouseEvent, item?: KeyedNavLink) => {
    if (item) {
      const extension = diagnostics?.extensions[item.key];
      if (isExtensionInfo(extension)) {
        setExtension(extension);
      }
    }
  };

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
                  {getEnvironmentName(value)}
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
      {(() => {
        if (isLoading) {
          return (
            <div className="tab-panel pending">
              <Spinner size="extra-large" aria-label="Loading diagnostics..." />
            </div>
          );
        }

        if (error) {
          return (
            <div className="tab-panel">
              <MessageBar intent="error">
                Error loading diagnostics: {error.message}
              </MessageBar>
            </div>
          );
        }

        if (selectedTab === "extensions" && diagnostics?.extensions) {
          return (
            <div className="tab-panel">
              <div className="stack">
                <Extensions
                  extensions={diagnostics.extensions}
                  onLinkClick={handleLinkClick}
                />
                {extension && <Extension {...extension} />}
              </div>
            </div>
          );
        }

        if (selectedTab === "build" && diagnostics?.buildInfo) {
          return (
            <div className="tab-panel">
              <BuildInfo {...diagnostics.buildInfo} />
            </div>
          );
        }

        if (selectedTab === "server" && diagnostics?.serverInfo) {
          return (
            <div className="tab-panel">
              <ServerInfo {...diagnostics.serverInfo} />
            </div>
          );
        }

        return null;
      })()}
    </div>
  );
};

export default App;
