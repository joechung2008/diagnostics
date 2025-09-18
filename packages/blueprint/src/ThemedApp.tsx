import App from "./App";
import { useSystemTheme } from "./useSystemTheme";
import { BlueprintProvider } from "@blueprintjs/core";

const ThemedApp: React.FC = () => {
  const theme = useSystemTheme();

  return (
    <BlueprintProvider>
      <div className={theme === "dark" ? "bp6-dark" : undefined}>
        <App />
      </div>
    </BlueprintProvider>
  );
};

export default ThemedApp;
