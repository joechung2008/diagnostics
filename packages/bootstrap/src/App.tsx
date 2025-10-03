import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
  Spinner,
} from "react-bootstrap";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";
import { useSystemTheme } from "./useSystemTheme";

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
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  // Use system theme hook to set data-bs-theme on html element
  useSystemTheme();

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

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions?.["paasserverless"]),
    [diagnostics]
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
      <ButtonGroup className="w-auto align-self-start">
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="environment-dropdown">
            {environmentName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {environments.map((env) => (
              <Dropdown.Item
                key={env.key}
                active={env.selected}
                onClick={env.onClick}
              >
                {env.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {showPaasServerless && (
          <Button
            variant="outline-secondary"
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
          variant="outline-secondary"
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
      <Nav
        variant="tabs"
        activeKey={selectedTab}
        onSelect={(selectedKey) => setSelectedTab(selectedKey || "extensions")}
      >
        <Nav.Item>
          <Nav.Link eventKey="extensions">Extensions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="build">Build Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="server">Server Information</Nav.Link>
        </Nav.Item>
      </Nav>
      <Activity mode={isLoading && !error ? "visible" : "hidden"}>
        <div className="tab-panel centered">
          <Spinner animation="border" />
        </div>
      </Activity>
      <Activity mode={error ? "visible" : "hidden"}>
        <div className="tab-panel centered">
          <Alert variant="danger">
            An error occurred while loading diagnostics.
          </Alert>
        </div>
      </Activity>
      <Activity
        mode={
          selectedTab === "extensions" && !error && !isLoading
            ? "visible"
            : "hidden"
        }
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
        mode={
          selectedTab === "build" && !error && !isLoading ? "visible" : "hidden"
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
          selectedTab === "server" && !error && !isLoading
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.serverInfo && (
          <div className="tab-panel">
            <ServerInfo {...diagnostics!.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
