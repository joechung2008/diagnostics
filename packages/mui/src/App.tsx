import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Activity, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { useSystemTheme } from "./useSystemTheme";
import { isExtensionInfo } from "./utils";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const EnvironmentUrls = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type EnvironmentUrl = (typeof EnvironmentUrls)[keyof typeof EnvironmentUrls];

const App: React.FC = () => {
  const theme = useSystemTheme();

  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<EnvironmentUrl>(
    EnvironmentUrls.Public
  );
  const [envMenuAnchorEl, setEnvMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

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

  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environments = useMemo(
    () => [
      {
        key: "public",
        text: "Public Cloud",
        selected: environment === EnvironmentUrls.Public,
        onClick: () => {
          setEnvironment(EnvironmentUrls.Public);
          setExtension(undefined);
          setSelectedTab("extensions");
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === EnvironmentUrls.Fairfax,
        onClick: () => {
          setEnvironment(EnvironmentUrls.Fairfax);
          setExtension(undefined);
          setSelectedTab("extensions");
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === EnvironmentUrls.Mooncake,
        onClick: () => {
          setEnvironment(EnvironmentUrls.Mooncake);
          setExtension(undefined);
          setSelectedTab("extensions");
        },
      },
    ],
    [environment]
  );

  const handleEnvMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setEnvMenuAnchorEl(event.currentTarget);
    },
    []
  );

  const handleEnvMenuClose = useCallback(() => {
    setEnvMenuAnchorEl(null);
  }, []);

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
    <ThemeProvider theme={theme}>
      <div className="flexbox">
        <Toolbar>
          <Button
            aria-controls={envMenuAnchorEl ? "env-menu" : undefined}
            aria-haspopup="true"
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: envMenuAnchorEl
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            }
            onClick={handleEnvMenuOpen}
          >
            {environments.find((env) => env.selected)?.text ??
              "Select Environment"}
          </Button>
          <Menu
            id="env-menu"
            anchorEl={envMenuAnchorEl}
            open={Boolean(envMenuAnchorEl)}
            onClose={handleEnvMenuClose}
          >
            {environments.map((env) => (
              <MenuItem
                key={env.key}
                selected={env.selected}
                onClick={() => {
                  env.onClick();
                  handleEnvMenuClose();
                }}
              >
                {env.text}
              </MenuItem>
            ))}
          </Menu>
          <Activity mode={showPaasServerless ? "visible" : "hidden"}>
            <Button
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
            </Button>
          </Activity>
          <Button
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
          </Button>
        </Toolbar>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue as string)}
          aria-label="App navigation"
        >
          <Tab label="Extensions" value="extensions" />
          <Tab label="Build Information" value="build" />
          <Tab label="Server Information" value="server" />
        </Tabs>
        <Activity mode={!error && isLoading ? "visible" : "hidden"}>
          <Grid className="tab-panel" container>
            <CircularProgress aria-label="Loading..." />
          </Grid>
        </Activity>
        <Activity mode={error && !isLoading ? "visible" : "hidden"}>
          <Grid className="tab-panel" container>
            <Alert severity="error">
              Error loading diagnostics: {String(error)}
            </Alert>
          </Grid>
        </Activity>
        <Activity
          mode={
            !error && !isLoading && selectedTab === "extensions"
              ? "visible"
              : "hidden"
          }
        >
          {diagnostics?.extensions && (
            <Grid className="tab-panel" container>
              <Grid className="stack" container gap="0.5rem">
                <Extensions
                  extensions={diagnostics.extensions}
                  onLinkClick={handleLinkClick}
                />
                {extension && <Extension {...extension} />}
              </Grid>
            </Grid>
          )}
        </Activity>
        <Activity
          mode={
            !error && !isLoading && selectedTab === "build"
              ? "visible"
              : "hidden"
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
            !error && !isLoading && selectedTab === "server"
              ? "visible"
              : "hidden"
          }
        >
          {diagnostics?.serverInfo && (
            <div className="tab-panel">
              <ServerInfo {...diagnostics.serverInfo} />
            </div>
          )}
        </Activity>
      </div>
    </ThemeProvider>
  );
};

export default App;
