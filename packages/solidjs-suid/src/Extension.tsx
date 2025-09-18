import Box from "@suid/material/Box";
import Typography from "@suid/material/Typography";
import Configuration from "./Configuration";
import StageDefinition from "./StageDefinition";

import "./styles.css";

function Extension(props: ExtensionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        overflowY: "auto",
        gap: "1rem",
      }}
    >
      <Typography variant="h1" color="text.primary" sx={{ fontSize: "3rem" }}>
        {props.extensionName}
      </Typography>
      {props.config && <Configuration config={props.config} />}
      {props.stageDefinition && (
        <StageDefinition stageDefinition={props.stageDefinition} />
      )}
    </Box>
  );
}

export default Extension;
