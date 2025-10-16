import {
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Menu,
  MenuItem,
} from "@suid/material";
import ExpandMore from "@suid/icons-material/ExpandMore";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
};

function App() {
  const [diagnostics, setDiagnostics] = createSignal<Diagnostics>();
  const [extension, setExtension] = createSignal<ExtensionInfo>();
  const [environment, setEnvironment] = createSignal(Environment.Public);
  const [selectedTab, setSelectedTab] = createSignal("extensions");

  const showPaasServerless = createMemo(() =>
    isExtensionInfo(diagnostics()?.extensions?.["paasserverless"])
  );

  const environments = [
    {
      key: "public",
      text: "Public Cloud",
      selected: () => environment() === Environment.Public,
      onClick: () => {
        setEnvironment(Environment.Public);
        setExtension(undefined);
        setSelectedTab("extensions");
      },
    },
    {
      key: "fairfax",
      text: "Fairfax",
      selected: () => environment() === Environment.Fairfax,
      onClick: () => {
        setEnvironment(Environment.Fairfax);
        setExtension(undefined);
        setSelectedTab("extensions");
      },
    },
    {
      key: "mooncake",
      text: "Mooncake",
      selected: () => environment() === Environment.Mooncake,
      onClick: () => {
        setEnvironment(Environment.Mooncake);
        setExtension(undefined);
        setSelectedTab("extensions");
      },
    },
  ];

  createEffect(() => {
    const getDiagnostics = async () => {
      const response = await fetch(environment());
      setDiagnostics(await response.json());
    };
    getDiagnostics();
  });

  const handleLinkClick = (_: unknown, item: KeyedNavLink) => {
    if (item) {
      const ext = diagnostics()?.extensions?.[item.key];
      if (isExtensionInfo(ext)) {
        setExtension(ext);
      }
    }
  };

  const [menuAnchor, setMenuAnchor] = createSignal<HTMLElement>();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const handleMenuOpen = (event: MouseEvent): void => {
    setMenuAnchor(event.currentTarget as HTMLButtonElement);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setMenuAnchor(undefined);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        height: "100vh",
      }}
    >
      <Toolbar>
        <Button variant="contained" onClick={handleMenuOpen}>
          {environments.find((env) => env.selected())?.text ??
            "Select Environment"}
          <span
            class={`chevron-icon${menuOpen() ? " open" : ""}`}
            style={{ display: "inline-flex", transition: "transform 0.3s" }}
          >
            <ExpandMore />
          </span>
        </Button>
        <Menu
          anchorEl={menuAnchor()}
          open={menuOpen()}
          onClose={handleMenuClose}
        >
          <For each={environments}>
            {(env) => (
              <MenuItem
                selected={env.selected()}
                onClick={() => {
                  env.onClick();
                  handleMenuClose();
                }}
              >
                {env.text}
              </MenuItem>
            )}
          </For>
        </Menu>
        <Show when={showPaasServerless()}>
          <Button
            onClick={() => {
              const paasserverless =
                diagnostics()?.extensions?.["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
                setSelectedTab("extensions");
              }
            }}
          >
            paasserverless
          </Button>
        </Show>
        <Button
          onClick={() => {
            const websites = diagnostics()?.extensions?.["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
              setSelectedTab("extensions");
            }
          }}
        >
          websites
        </Button>
      </Toolbar>
      <ButtonGroup>
        <Button
          variant={selectedTab() === "extensions" ? "contained" : "outlined"}
          onClick={() => setSelectedTab("extensions")}
        >
          Extensions
        </Button>
        <Button
          variant={selectedTab() === "build" ? "contained" : "outlined"}
          onClick={() => setSelectedTab("build")}
        >
          Build Information
        </Button>
        <Button
          variant={selectedTab() === "server" ? "contained" : "outlined"}
          onClick={() => setSelectedTab("server")}
        >
          Server Information
        </Button>
      </ButtonGroup>
      <Show when={diagnostics()}>
        <Show when={selectedTab() === "extensions"}>
          <Box sx={{ boxSizing: "border-box", flex: "1", overflowY: "auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                gap: "1rem",
                height: "100%",
              }}
            >
              <Extensions
                extensions={diagnostics().extensions}
                onLinkClick={handleLinkClick}
              />
              <Show when={extension()}>
                <Extension {...extension()} />
              </Show>
            </Box>
          </Box>
        </Show>
        <Show when={selectedTab() === "build"}>
          <Box sx={{ boxSizing: "border-box", flex: "1", overflowY: "auto" }}>
            <BuildInfo {...diagnostics().buildInfo} />
          </Box>
        </Show>
        <Show when={selectedTab() === "server"}>
          <Box sx={{ boxSizing: "border-box", flex: "1", overflowY: "auto" }}>
            <ServerInfo {...diagnostics().serverInfo} />
          </Box>
        </Show>
      </Show>
    </Box>
  );
}

export default App;

/* Animation for chevron icon */
import "./styles.css";
