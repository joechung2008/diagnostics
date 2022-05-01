import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from '@fluentui/react';

const columns: IColumn[] = [
  {
    key: 'name',
    fieldName: 'name',
    minWidth: 200,
    name: 'Name',
  },
  {
    key: 'value',
    fieldName: 'value',
    flexGrow: 1,
    minWidth: 0,
    name: 'Value',
  },
];

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const items = [
    {
      name: 'Build Version',
      value: buildVersion,
    },
  ];

  return (
    <DetailsList
      columns={columns}
      isHeaderVisible={false}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      items={items}
      selectionMode={SelectionMode.none}
    />
  );
};

export default BuildInfo;
