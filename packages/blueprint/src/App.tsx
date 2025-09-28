import { Button, ButtonGroup, Tab, Tabs } from "@blueprintjs/core";
import { useEffect, useMemo, useState } from "react";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

type Environment =
  | "https://hosting.portal.azure.net/api/diagnostics"
  | "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
  | "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics";

const ENVIRONMENT_PUBLIC: Environment =
  "https://hosting.portal.azure.net/api/diagnostics";
const ENVIRONMENT_FAIRFAX: Environment =
  "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics";
const ENVIRONMENT_MOONCAKE: Environment =
  "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics";

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] =
    useState<Environment>(ENVIRONMENT_PUBLIC);
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
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

  const handleLinkClick = (item?: KeyedNavLink) => {
    if (item) {
      const extension = extensions[item.key];
      if (isExtensionInfo(extension)) {
        setExtension(extension);
      }
    }
  };

  return (
    <div className="flexbox">
      <ButtonGroup>
        <Button
          active={environment === ENVIRONMENT_PUBLIC}
          variant="minimal"
          onClick={() => {
            setEnvironment(ENVIRONMENT_PUBLIC);
            setExtension(undefined);
          }}
        >
          Public Cloud
        </Button>
        <Button
          active={environment === ENVIRONMENT_FAIRFAX}
          variant="minimal"
          onClick={() => {
            setEnvironment(ENVIRONMENT_FAIRFAX);
            setExtension(undefined);
          }}
        >
          Fairfax
        </Button>
        <Button
          active={environment === ENVIRONMENT_MOONCAKE}
          variant="minimal"
          onClick={() => {
            setEnvironment(ENVIRONMENT_MOONCAKE);
            setExtension(undefined);
          }}
        >
          Mooncake
        </Button>
        <span
          style={{
            margin: "0 8px",
            borderLeft: "1px solid #ccc",
            height: "24px",
            alignSelf: "center",
          }}
        />
        {showPaasServerless && (
          <Button
            variant="minimal"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
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
