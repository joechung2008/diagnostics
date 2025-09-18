import BuildInfo from "@/BuildInfo";
import Extension from "@/Extension";
import Extensions from "@/Extensions";
import ServerInfo from "@/ServerInfo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isExtensionInfo } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<string>(Environment.Public);
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

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
    <div className="flex flex-col gap-1 h-screen">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{environmentName}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-1 w-max min-w-[10rem]">
                  {environments.map((env) => (
                    <NavigationMenuLink
                      key={env.key}
                      onClick={env.onClick}
                      aria-checked={env.selected}
                      role="menuitemradio"
                      className={`w-full text-left rounded-sm p-2 text-sm whitespace-nowrap cursor-pointer ${
                        env.selected
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {env.text}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {showPaasServerless && (
              <NavigationMenuItem
                key="paasserverless"
                onClick={() => {
                  const paasserverless =
                    diagnostics?.extensions["paasserverless"];
                  if (isExtensionInfo(paasserverless)) {
                    setExtension(paasserverless);
                  }
                }}
              >
                paasserverless
              </NavigationMenuItem>
            )}
            <NavigationMenuItem
              className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              key="websites"
              onClick={() => {
                const websites = diagnostics?.extensions["websites"];
                if (isExtensionInfo(websites)) {
                  setExtension(websites);
                }
              }}
            >
              websites
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger aria-controls="extensions-tab" value="extensions">
            Extensions
          </TabsTrigger>
          <TabsTrigger aria-controls="build-tab" value="build">
            Build Information
          </TabsTrigger>
          <TabsTrigger aria-controls="server-tab" value="server">
            Server Information
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {selectedTab === "extensions" && (
        <div id="extensions-tab" className="box-border flex-1 overflow-y-auto">
          <div className="flex flex-row gap-4 h-full">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && (
        <div id="build-tab" className="box-border flex-1 overflow-y-auto">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div id="server-tab" className="box-border flex-1 overflow-y-auto">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
