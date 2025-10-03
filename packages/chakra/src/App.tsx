import BuildInfo from "@/BuildInfo";
import { ColorModeButton } from "@/components/ui/ColorMode";
import Extension from "@/Extension";
import Extensions from "@/Extensions";
import ServerInfo from "@/ServerInfo";
import { isExtensionInfo } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Menu,
  Portal,
  Tabs,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import {
  startTransition,
  useCallback,
  useMemo,
  useState,
  Activity,
} from "react";
import useSWR from "swr";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type EnvironmentUrl = (typeof Environment)[keyof typeof Environment];

function getEnvironnmentName(environment: EnvironmentUrl | undefined): string {
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
}

const App: React.FC = () => {
  const [environments, setEnvironments] = useState<
    Record<string, EnvironmentUrl[]>
  >({
    environment: [Environment.Public],
  });
  const environment = useMemo<EnvironmentUrl>(
    () => environments.environment[0],
    [environments.environment]
  );
  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(environment, async (url: string): Promise<Diagnostics> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
    }

    return response.json();
  });
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const handleLinkClick: ExtensionsProps["onLinkClick"] = useCallback(
    (_, item) => {
      if (item) {
        const $extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo($extension)) {
          setExtension($extension);
        }
      }
    },
    [diagnostics?.extensions]
  );

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environmentName = useMemo(
    () => getEnvironnmentName(environment),
    [environment]
  );

  const handleEnvironmentChange = useCallback((value: string) => {
    if (value) {
      startTransition(() => {
        setEnvironments((previous) => ({
          ...previous,
          environment: [value as EnvironmentUrl],
        }));
        setExtension(undefined);
        setSelectedTab("extensions");
      });
    }
  }, []);

  return (
    <Flex flexDirection="column" h="100vh" p="1">
      <Flex justify="space-between">
        <Flex gap="1">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline">{environmentName}</Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {Object.entries(Environment).map(([key, value]) => (
                    <Menu.Item
                      key={key}
                      value={value}
                      onClick={() => handleEnvironmentChange(value)}
                    >
                      {getEnvironnmentName(value)}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Activity mode={showPaasServerless ? "visible" : "hidden"}>
            <Button
              key="paasserverless"
              variant="ghost"
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
            </Button>
          </Activity>
          <Button
            key="websites"
            variant="ghost"
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
        </Flex>
        <ColorModeButton />
      </Flex>
      <Tabs.Root
        value={selectedTab}
        onValueChange={(details) => setSelectedTab(details.value)}
      >
        <Tabs.List>
          <Tabs.Trigger aria-controls="extensions-tab" value="extensions">
            Extensions
          </Tabs.Trigger>
          <Tabs.Trigger aria-controls="build-tab" value="build">
            Build Information
          </Tabs.Trigger>
          <Tabs.Trigger aria-controls="server-tab" value="server">
            Server Information
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Activity mode={isLoading && !error ? "visible" : "hidden"}>
        <Box
          alignItems="center"
          display="flex"
          flex="1"
          justifyContent="center"
        >
          <Spinner aria-label="Loading..." />
        </Box>
      </Activity>
      <Activity mode={!isLoading && error ? "visible" : "hidden"}>
        <Box
          alignItems="center"
          display="flex"
          flex="1"
          justifyContent="center"
        >
          <Alert.Root status="error" maxW="md">
            <Alert.Indicator />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{error?.message}</Alert.Description>
          </Alert.Root>
        </Box>
      </Activity>
      <Activity
        mode={
          !isLoading && !error && selectedTab === "extensions"
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.extensions && (
          <Box id="extensions-tab" flex="1" overflowY="auto" role="tabpanel">
            <Flex flexDirection="row" gap="4" h="100%">
              <Extensions
                extensions={diagnostics.extensions}
                onLinkClick={handleLinkClick}
              />
              {extension && <Extension {...extension} />}
            </Flex>
          </Box>
        )}
      </Activity>
      <Activity
        mode={
          !isLoading && !error && selectedTab === "build" ? "visible" : "hidden"
        }
      >
        {diagnostics?.buildInfo && (
          <Box id="build-tab" flex="1" overflowY="auto" role="tabpanel">
            <BuildInfo {...diagnostics.buildInfo} />
          </Box>
        )}
      </Activity>
      <Activity
        mode={
          !isLoading && !error && selectedTab === "server"
            ? "visible"
            : "hidden"
        }
      >
        {diagnostics?.serverInfo && (
          <Box id="server-tab" flex="1" overflowY="auto" role="tabpanel">
            <ServerInfo {...diagnostics.serverInfo} />
          </Box>
        )}
      </Activity>
    </Flex>
  );
};

export default App;
