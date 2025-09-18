import { Button, Menu, Tab, Tabs, Toolbar } from "grommet";
import { useEffect, useMemo, useState } from "react";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import { isExtensionInfo } from "./utils";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<string>(Environment.Public);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
    (async () => {
      const response = await fetch(environment);
      setDiagnostics(await response.json());
    })();
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
    <div className="flexbox">
      <Toolbar align="center">
        <Menu
          label={environmentName}
          items={environments.map((env) => ({
            label: env.text,
            onClick: env.onClick,
          }))}
        />
        {showPaasServerless && (
          <Button
            label="paasserverless"
            plain
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
              }
            }}
          />
        )}
        <Button
          label="websites"
          plain
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
            }
          }}
        />
      </Toolbar>
      <Tabs activeIndex={activeIndex} justify="start" onActive={setActiveIndex}>
        <Tab title="Extensions" />
        <Tab title="Build Information" />
        <Tab title="Server Information" />
      </Tabs>
      {activeIndex === 0 && (
        <div className="tab-panel">
          <div className="stack">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        <div className="tab-panel">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {activeIndex === 2 && (
        <div className="tab-panel">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
