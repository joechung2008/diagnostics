import App from "./App";
import { useSystemTheme } from "./useSystemTheme";
import { BlueprintProvider } from "@blueprintjs/core";

const ThemedApp: React.FC = () => {
  const theme = useSystemTheme();

  return (
    <BlueprintProvider>
      <App className={theme === "dark" ? "bp6-dark" : undefined} />
    </BlueprintProvider>
  );
};

export default ThemedApp;
