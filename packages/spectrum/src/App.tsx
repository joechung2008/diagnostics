import {
  ActionButton,
  InlineAlert,
  Item,
  Menu,
  MenuTrigger,
  ProgressCircle,
  TabList,
  Tabs,
} from "@adobe/react-spectrum";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

import styles from "./App.module.css";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type EnvironmentUrl = (typeof Environment)[keyof typeof Environment];

const App: React.FC = () => {
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<EnvironmentUrl>(
    Environment.Public
  );
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("extensions");

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR<Diagnostics>(environment, async (environment: string) => {
    const response = await fetch(environment);
    if (!response.ok) {
      throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
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
    <div className={styles.flexbox}>
      <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
        <MenuTrigger>
          <ActionButton>{environmentName}</ActionButton>
          <Menu
            onAction={(key) => {
              environments.find((e) => e.key === key)?.onClick();
            }}
          >
            {environments.map((env) => (
              <Item key={env.key}>{env.text}</Item>
            ))}
          </Menu>
        </MenuTrigger>
        <Activity mode={showPaasServerless ? "visible" : "hidden"}>
          <ActionButton
            onPress={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
                setSelectedTab("extensions");
              }
            }}
          >
            paasserverless
          </ActionButton>
        </Activity>
        <ActionButton
          onPress={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
              setSelectedTab("extensions");
            }
          }}
        >
          websites
        </ActionButton>
      </div>
      <Tabs
        aria-label="Information Tabs"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key)}
      >
        <TabList>
          <Item key="extensions">Extensions</Item>
          <Item key="build">Build Information</Item>
          <Item key="server">Server Information</Item>
        </TabList>
      </Tabs>
      <Activity mode={!error && isLoading ? "visible" : "hidden"}>
        <div className={(styles["tab-panel"], styles["centered"])}>
          <ProgressCircle aria-label="Loading..." isIndeterminate />
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        <div className={(styles["tab-panel"], styles["centered"])}>
          <InlineAlert variant="negative">Error loading data</InlineAlert>
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
          <div className={styles["tab-panel"]} role="tabpanel">
            <div className={styles.stack}>
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
          <div className={styles["tab-panel"]} role="tabpanel">
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
          <div className={styles["tab-panel"]} role="tabpanel">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
