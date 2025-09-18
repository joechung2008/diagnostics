import {
  ActionButton,
  Item,
  Menu,
  MenuTrigger,
  TabList,
  Tabs,
} from "@adobe/react-spectrum";
import { useEffect, useMemo, useState } from "react";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

import styles from "./App.module.css";

type Environment = (typeof Environment)[keyof typeof Environment];

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public
  );
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("extensions");

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
    <div className={styles.flexbox}>
      <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
        <MenuTrigger>
          <ActionButton>{environmentName}</ActionButton>
          <Menu
            onAction={(key) => {
              const env = environments.find((e) => e.key === key);
              env?.onClick();
            }}
          >
            {environments.map((env) => (
              <Item key={env.key}>{env.text}</Item>
            ))}
          </Menu>
        </MenuTrigger>
        {showPaasServerless && (
          <ActionButton
            onPress={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
              }
            }}
          >
            paasserverless
          </ActionButton>
        )}
        <ActionButton
          onPress={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
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
      {selectedTab === "extensions" && (
        <div className={styles["tab-panel"]} role="tabpanel">
          <div className={styles.stack}>
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && (
        <div className={styles["tab-panel"]} role="tabpanel">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div className={styles["tab-panel"]} role="tabpanel">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
