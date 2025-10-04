import {
  Button,
  Menu,
  Notification,
  Spinner,
  Tab,
  Tabs,
  Toolbar,
} from "grommet";
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

const App: React.FC = () => {
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<string>(Environment.Public);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(environment, async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching diagnostics: ${response.statusText}`);
    }

    return response.json();
  });

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
          setActiveIndex(0);
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === Environment.Fairfax,
        onClick: () => {
          setEnvironment(Environment.Fairfax);
          setExtension(undefined);
          setActiveIndex(0);
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === Environment.Mooncake,
        onClick: () => {
          setEnvironment(Environment.Mooncake);
          setExtension(undefined);
          setActiveIndex(0);
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
      <Toolbar align="center">
        <Menu
          label={environmentName}
          items={environments.map((env) => ({
            label: env.text,
            onClick: env.onClick,
          }))}
        />
        <Activity mode={showPaasServerless ? "visible" : "hidden"}>
          <Button
            label="paasserverless"
            plain
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
                setActiveIndex(0);
              }
            }}
          />
        </Activity>
        <Button
          label="websites"
          plain
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
              setActiveIndex(0);
            }
          }}
        />
      </Toolbar>
      <Tabs activeIndex={activeIndex} justify="start" onActive={setActiveIndex}>
        <Tab title="Extensions" />
        <Tab title="Build Information" />
        <Tab title="Server Information" />
      </Tabs>
      <Activity mode={!error && isLoading ? "visible" : "hidden"}>
        <div className="tab-panel">
          <div className="centered">
            <Spinner aria-label="Loading..." />
          </div>
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        <div className="tab-panel">
          <div className="centered">
            <Notification
              status="critical"
              message={`Error: ${error instanceof Error ? error.message : "Unknown error"}`}
            />
          </div>
        </div>
      </Activity>
      <Activity
        mode={!error && !isLoading && activeIndex === 0 ? "visible" : "hidden"}
      >
        {diagnostics?.extensions && (
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
      </Activity>
      <Activity
        mode={!error && !isLoading && activeIndex === 1 ? "visible" : "hidden"}
      >
        {diagnostics?.buildInfo && (
          <div className="tab-panel">
            <BuildInfo {...diagnostics.buildInfo} />
          </div>
        )}
      </Activity>
      <Activity
        mode={!error && !isLoading && activeIndex === 2 ? "visible" : "hidden"}
      >
        {diagnostics?.serverInfo && (
          <div className="tab-panel">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
