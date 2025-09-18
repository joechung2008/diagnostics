import { Grid, Typography } from "@mui/material";
import Configuration from "./Configuration";
import StageDefinition from "./StageDefinition";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <Grid className="extension-root" size="grow">
      <Typography variant="h2" fontWeight="semibold">
        {extensionName}
      </Typography>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </Grid>
  );
};

export default Extension;
