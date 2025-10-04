import BuildInfo from "@/BuildInfo";
import Extension from "@/Extension";
import Extensions from "@/Extensions";
import ServerInfo from "@/ServerInfo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/useSystemTheme";
import { isExtensionInfo } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const App: React.FC = () => {
  useTheme();

  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<string>(Environment.Public);
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
                      aria-checked={env.selected}
                      className={`w-full text-left rounded-sm p-2 text-sm whitespace-nowrap cursor-pointer ${
                        env.selected
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                      role="menuitemradio"
                      onClick={env.onClick}
                    >
                      {env.text}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <Activity mode={showPaasServerless ? "visible" : "hidden"}>
              <NavigationMenuItem
                className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                key="paasserverless"
                onClick={() => {
                  const paasserverless =
                    diagnostics?.extensions["paasserverless"];
                  if (isExtensionInfo(paasserverless)) {
                    setExtension(paasserverless);
                    setSelectedTab("extensions");
                  }
                }}
              >
                paasserverless
              </NavigationMenuItem>
            </Activity>
            <NavigationMenuItem
              className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              key="websites"
              onClick={() => {
                const websites = diagnostics?.extensions["websites"];
                if (isExtensionInfo(websites)) {
                  setExtension(websites);
                  setSelectedTab("extensions");
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
      <Activity mode={!error && isLoading ? "visible" : "hidden"}>
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="size-20" />
        </div>
      </Activity>
      <Activity mode={error && !isLoading ? "visible" : "hidden"}>
        <div className="flex-1 flex items-center justify-center">
          <div>
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error?.message ?? "Unknown error"}
              </AlertDescription>
            </Alert>
          </div>
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
          <div
            id="extensions-tab"
            className="box-border flex-1 overflow-y-auto"
          >
            <div className="flex flex-row gap-4 h-full">
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
          <div id="build-tab" className="box-border flex-1 overflow-y-auto">
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
          <div id="server-tab" className="box-border flex-1 overflow-y-auto">
            <ServerInfo {...diagnostics.serverInfo} />
          </div>
        )}
      </Activity>
    </div>
  );
};

export default App;
