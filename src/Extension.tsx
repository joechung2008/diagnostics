import { IStackStyles, Stack, Text } from '@fluentui/react';
import Configuration from './Configuration';
import StageDefinition from './StageDefinition';

const styles: IStackStyles = {
  root: {
    maxHeight: 'calc(100vh - 88px)',
    overflowY: 'auto',
  },
};

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => (
  <Stack styles={styles} tokens={{ childrenGap: '1rem' }}>
    <Text block variant="xLarge">
      {extensionName}
    </Text>
    {config && <Configuration config={config} />}
    {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
  </Stack>
);

export default Extension;
