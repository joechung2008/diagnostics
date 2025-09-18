import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Tab,
  Tabs,
  type PressEvent,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
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

  const handleLinkClick = (_?: PressEvent, item?: KeyedNavLink) => {
    if (item) {
      const extension = extensions[item.key];
      if (isExtensionInfo(extension)) {
        setExtension(extension);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 h-screen">
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
          {showPaasServerless && (
            <Button
              key="paasserverless"
              variant="flat"
              onPress={() => {
                const paasserverless =
                  diagnostics?.extensions["paasserverless"];
                if (isExtensionInfo(paasserverless)) {
                  setExtension(paasserverless);
                }
              }}
            >
              paasserverless
            </Button>
          )}
          <Button
            key="websites"
            variant="flat"
            onPress={() => {
              const websites = diagnostics?.extensions["websites"];
              if (isExtensionInfo(websites)) {
                setExtension(websites);
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
      {selectedTab === "extensions" && (
        <div className="box-border flex-1 overflow-y-auto">
          <div className="flex flex-row gap-2 h-full">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && (
        <div className="box-border flex-1 overflow-y-auto">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div className="box-border flex-1 overflow-y-auto">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
