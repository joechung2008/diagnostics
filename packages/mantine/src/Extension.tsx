import { Text } from "@mantine/core";
import Configuration from "./Configuration";
import StageDefinition from "./StageDefinition";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <div className="extension-root grow">
      <Text component="h2" size="xl" fw="bold">
        {extensionName}
      </Text>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </div>
  );
};

export default Extension;
