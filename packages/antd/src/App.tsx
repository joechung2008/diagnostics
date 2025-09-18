import { Flex, Menu, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

import "./App.css";

const EnvironmentValues = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<string>(
    EnvironmentValues.Public
  );
  const [selectedTab, setSelectedTab] = useState("extensions");

  const environmentName = useMemo(() => {
    switch (environment) {
      case EnvironmentValues.Public:
        return "Public Cloud";
      case EnvironmentValues.Fairfax:
        return "Fairfax";
      case EnvironmentValues.Mooncake:
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
        selected: environment === EnvironmentValues.Public,
        onClick: () => {
          setEnvironment(EnvironmentValues.Public);
          setExtension(undefined);
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === EnvironmentValues.Fairfax,
        onClick: () => {
          setEnvironment(EnvironmentValues.Fairfax);
          setExtension(undefined);
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === EnvironmentValues.Mooncake,
        onClick: () => {
          setEnvironment(EnvironmentValues.Mooncake);
          setExtension(undefined);
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
      ...(showPaasServerless
        ? [
            {
              key: "paasserverless",
              label: "paasserverless",
              onClick: () => {
                const paasserverless =
                  diagnostics?.extensions["paasserverless"];
                if (isExtensionInfo(paasserverless)) {
                  setExtension(paasserverless);
                }
              },
            },
          ]
        : []),
      {
        key: "websites",
        label: "websites",
        onClick: () => {
          const websites = diagnostics?.extensions["websites"];
          if (isExtensionInfo(websites)) {
            setExtension(websites);
          }
        },
      },
    ],
    [environments, environmentName, showPaasServerless, diagnostics?.extensions]
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
      <Menu mode="horizontal" items={menuItems} />
      <Tabs
        activeKey={selectedTab}
        className="tab-list"
        items={[
          { key: "extensions", label: "Extensions" },
          { key: "build", label: "Build Information" },
          { key: "server", label: "Server Information" },
        ]}
        onChange={(key) => setSelectedTab(key)}
      />
      {selectedTab === "extensions" && (
        <div className="tab-panel">
          <Flex className="stack">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </Flex>
        </div>
      )}
      {selectedTab === "build" && (
        <div className="tab-panel">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div className="tab-panel">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
