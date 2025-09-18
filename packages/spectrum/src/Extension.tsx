import { Heading } from "@adobe/react-spectrum";
import clsx from "clsx";
import Configuration from "./Configuration";
import StageDefinition from "./StageDefinition";

import styles from "./Extension.module.css";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <div className={clsx(styles["extension-root"], styles.grow)}>
      <Heading level={2}>{extensionName}</Heading>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </div>
  );
};

export default Extension;
