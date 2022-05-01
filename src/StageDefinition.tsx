import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Text,
} from '@fluentui/react';

const columns: IColumn[] = [
  {
    key: 'key',
    fieldName: 'key',
    flexGrow: 1,
    isResizable: true,
    minWidth: 0,
    name: 'Key',
  },
  {
    key: 'value',
    fieldName: 'value',
    flexGrow: 1,
    isResizable: true,
    minWidth: 0,
    name: 'Value',
    onRender({ value }) {
      return value.join(', ');
    },
  },
];

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <Text variant="large">Stage Definitions</Text>
      <DetailsList
        columns={columns}
        compact
        isHeaderVisible={false}
        items={items}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default StageDefinition;
