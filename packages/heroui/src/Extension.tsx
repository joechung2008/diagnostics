import Configuration from "./Configuration";
import StageDefinition from "./StageDefinition";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <div className="flex flex-col flex-grow gap-3 max-h-max overflow-y-auto px-2 py-0">
      <h1 className="text-4xl font-bold">{extensionName}</h1>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </div>
  );
};

export default Extension;
