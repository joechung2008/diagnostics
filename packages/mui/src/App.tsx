import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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

type Environment = (typeof EnvironmentUrls)[keyof typeof EnvironmentUrls];

const App: React.FC = () => {
  const theme = useSystemTheme();

  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    EnvironmentUrls.Public
  );
  const [envMenuAnchorEl, setEnvMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const handleEnvMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEnvMenuAnchorEl(event.currentTarget);
  };
  const handleEnvMenuClose = () => {
    setEnvMenuAnchorEl(null);
  };
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
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === EnvironmentUrls.Fairfax,
        onClick: () => {
          setEnvironment(EnvironmentUrls.Fairfax);
          setExtension(undefined);
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === EnvironmentUrls.Mooncake,
        onClick: () => {
          setEnvironment(EnvironmentUrls.Mooncake);
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
          {showPaasServerless && (
            <Button
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
            </Button>
          )}
          <Button
            key="websites"
            onClick={() => {
              const websites = diagnostics?.extensions["websites"];
              if (isExtensionInfo(websites)) {
                setExtension(websites);
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
        {selectedTab === "extensions" && (
          <Grid className="tab-panel" container>
            <Grid className="stack" container gap="0.5rem">
              <Extensions
                extensions={extensions}
                onLinkClick={handleLinkClick}
              />
              {extension && <Extension {...extension} />}
            </Grid>
          </Grid>
        )}
        {selectedTab === "build" && (
          <div className="tab-panel">
            <BuildInfo {...buildInfo} />
          </div>
        )}
        {selectedTab === "server" && (
          <div className="tab-panel">
            <ServerInfo {...serverInfo} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
