import Configuration from "@/Configuration";
import StageDefinition from "@/StageDefinition";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <div className="flex flex-col gap-2 max-h-max overflow-y-auto p-2 flex-grow">
      <h1 className="text-xl font-semibold">{extensionName}</h1>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </div>
  );
};

export default Extension;
