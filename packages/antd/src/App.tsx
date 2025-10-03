import { Empty, Flex, Menu, Spin, Tabs } from "antd";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo, when } from "./utils";

import "./App.css";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type EnvironmentUrl = (typeof Environment)[keyof typeof Environment];

const items = [
  { key: "extensions", label: "Extensions" },
  { key: "build", label: "Build Information" },
  { key: "server", label: "Server Information" },
];

const App: React.FC = () => {
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<EnvironmentUrl>(
    Environment.Public
  );
  const [selectedTab, setSelectedTab] = useState("extensions");

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

  const menuItems = useMemo(
    () => [
      {
        key: "env-dropdown",
        label: environmentName,
        children: environments.map((env) => ({
          key: env.key,
          label: env.text,
          onClick: env.onClick,
        })),
      },
      ...when(showPaasServerless, {
        key: "paasserverless",
        label: "paasserverless",
        onClick: () => {
          const paasserverless = diagnostics?.extensions["paasserverless"];
          if (isExtensionInfo(paasserverless)) {
            setExtension(paasserverless);
            setSelectedTab("extensions");
          }
        },
      }),
      {
        key: "websites",
        label: "websites",
        onClick: () => {
          const websites = diagnostics?.extensions["websites"];
          if (isExtensionInfo(websites)) {
            setExtension(websites);
            setSelectedTab("extensions");
          }
        },
      },
    ],
    [environments, environmentName, showPaasServerless, diagnostics?.extensions]
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
      <Menu mode="horizontal" items={menuItems} />
      <Tabs
        activeKey={selectedTab}
        className="tab-list"
        items={items}
        onChange={(key) => setSelectedTab(key)}
      />
      <Activity mode={isLoading ? "visible" : "hidden"}>
        <div className="tab-panel">
          <Flex className="centered">
            <Spin size="large" />
          </Flex>
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        {error && (
          <div className="tab-panel">
            <Flex className="centered">
              <Empty
                description={`Error: ${error.message ?? "Unexpected error"}`}
              />
            </Flex>
          </div>
        )}
      </Activity>
      <Activity
        mode={
          !error && !isLoading && selectedTab === "extensions"
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.extensions && (
          <div className="tab-panel">
            <Flex className="stack">
              <Extensions
                extensions={diagnostics.extensions}
                onLinkClick={handleLinkClick}
              />
              {extension && <Extension {...extension} />}
            </Flex>
          </div>
        )}
      </Activity>
      <Activity
        mode={
          !error && !isLoading && selectedTab === "build" ? "visible" : "hidden"
        }
      >
        {diagnostics?.buildInfo && (
          <div className="tab-panel">
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
        {diagnostics?.buildInfo && (
          <div className="tab-panel">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
