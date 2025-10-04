import {
  Button,
  ButtonGroup,
  NonIdealState,
  Spinner,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
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

type EnvironmentUrl =
  | "https://hosting.portal.azure.net/api/diagnostics"
  | "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
  | "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics";

interface AppProps {
  className?: string;
}

const App = ({ className }: AppProps) => {
  const [environment, setEnvironment] = useState<EnvironmentUrl>(
    Environment.Public
  );
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(environment, async (environment: string) => {
    const response = await fetch(environment);
    if (!response.ok) {
      throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
    }

    return response.json();
  });

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const handleLinkClick = useCallback(
    (item?: KeyedNavLink) => {
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
    <div className={clsx("flexbox", className)}>
      <ButtonGroup>
        <Button
          active={environment === Environment.Public}
          variant="minimal"
          onClick={() => {
            setEnvironment(Environment.Public);
            setExtension(undefined);
            setSelectedTab("extensions");
          }}
        >
          Public Cloud
        </Button>
        <Button
          active={environment === Environment.Fairfax}
          variant="minimal"
          onClick={() => {
            setEnvironment(Environment.Fairfax);
            setExtension(undefined);
            setSelectedTab("extensions");
          }}
        >
          Fairfax
        </Button>
        <Button
          active={environment === Environment.Mooncake}
          variant="minimal"
          onClick={() => {
            setEnvironment(Environment.Mooncake);
            setExtension(undefined);
            setSelectedTab("extensions");
          }}
        >
          Mooncake
        </Button>
        <span className="button-group-separator" />
        {showPaasServerless && (
          <Button
            variant="minimal"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
                setSelectedTab("extensions");
              }
            }}
          >
            paasserverless
          </Button>
        )}
        <Button
          variant="minimal"
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
              setSelectedTab("extensions");
            }
          }}
        >
          websites
        </Button>
      </ButtonGroup>
      <Tabs
        selectedTabId={selectedTab}
        size="large"
        onChange={(tabId) => setSelectedTab(tabId as string)}
      >
        <Tab
          id="extensions"
          aria-controls="extensions-tab"
          title="Extensions"
        />
        <Tab id="build" aria-controls="build-tab" title="Build Information" />
        <Tab
          id="server"
          aria-controls="server-tab"
          title="Server Information"
        />
      </Tabs>
      {isLoading ? (
        <div className="tab-panel vertical-center">
          <Spinner aria-label="Loading..." />
        </div>
      ) : error ? (
        <NonIdealState icon="error" title="Error" description={error.message} />
      ) : selectedTab === "extensions" && diagnostics?.extensions ? (
        <div id="extensions-tab" className="tab-panel">
          <div className="stack">
            <Extensions
              extensions={diagnostics.extensions}
              onLinkClick={handleLinkClick}
            />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      ) : selectedTab === "build" && diagnostics?.buildInfo ? (
        <div id="build-tab" className="tab-panel">
          <BuildInfo {...diagnostics.buildInfo} />
        </div>
      ) : selectedTab === "server" && diagnostics?.serverInfo ? (
        <div id="server-tab" className="tab-panel">
          <ServerInfo {...diagnostics.serverInfo} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
