import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Spinner,
  Tab,
  Tabs,
  type PressEvent,
} from "@heroui/react";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

const enum Environment {
  Public = "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax = "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake = "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
}

const App: React.FC = () => {
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
    (_?: PressEvent, item?: KeyedNavLink) => {
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
    <div className="flex flex-col h-screen">
      <Navbar maxWidth="full">
        <NavbarContent as="nav" justify="start">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{environmentName}</Button>
            </DropdownTrigger>
            <DropdownMenu>
              {environments.map((env) => (
                <DropdownItem
                  key={env.key}
                  onClick={env.onClick}
                  aria-checked={env.selected}
                >
                  {env.text}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Activity mode={showPaasServerless ? "visible" : "hidden"}>
            <Button
              key="paasserverless"
              variant="flat"
              onPress={() => {
                const paasserverless =
                  diagnostics?.extensions["paasserverless"];
                if (isExtensionInfo(paasserverless)) {
                  setExtension(paasserverless);
                  setSelectedTab("extensions");
                }
              }}
            >
              paasserverless
            </Button>
          </Activity>
          <Button
            key="websites"
            variant="flat"
            onPress={() => {
              const websites = diagnostics?.extensions["websites"];
              if (isExtensionInfo(websites)) {
                setExtension(websites);
                setSelectedTab("extensions");
              }
            }}
          >
            websites
          </Button>
        </NavbarContent>
      </Navbar>
      <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <Tab key="extensions" title="Extensions" />
        <Tab key="build" title="Build Information" />
        <Tab key="server" title="Server Information" />
      </Tabs>
      <Activity mode={!error && isLoading ? "visible" : "hidden"}>
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" aria-label="Loading..." className="mx-auto" />
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        <div className="flex justify-center items-center h-full">
          <Alert color="danger">
            Error loading diagnostics: {error?.message ?? "Unknown error"}
          </Alert>
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
          <div className="box-border flex-1 overflow-y-auto">
            <div className="flex flex-row gap-2 h-full">
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
          <div className="box-border flex-1 overflow-y-auto">
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
          <div className="box-border flex-1 overflow-y-auto">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
