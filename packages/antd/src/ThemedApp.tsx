import { ConfigProvider, theme } from "antd";
import { useEffect, useMemo, useState } from "react";
import App from "./App";

function ThemedApp() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = ({ matches }: MediaQueryListEvent) => {
      setIsDark(matches);
    };

    mediaQueryList.addEventListener("change", onChange);

    return () => {
      mediaQueryList.removeEventListener("change", onChange);
    };
  }, []);

  const algorithm = useMemo(
    () => (isDark ? theme.darkAlgorithm : theme.defaultAlgorithm),
    [isDark]
  );

  useEffect(() => {
    const token = theme.getDesignToken?.({ algorithm });
    if (token?.colorBgBase) {
      document.body.style.background = token.colorBgBase;
    }
  }, [algorithm]);

  return (
    <ConfigProvider theme={{ algorithm }}>
      <App />
    </ConfigProvider>
  );
}

export default ThemedApp;
