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

const ServerInfo: React.FC<ServerInfoProps> = ({
  deploymentId,
  extensionSync,
  hostname,
  nodeVersions,
  serverId,
  uptime,
}) => {
  const items = [
    {
      name: 'Hostname',
      value: hostname,
    },
    {
      name: 'Uptime',
      value: uptime,
    },
    {
      name: 'Server ID',
      value: serverId,
    },
    {
      name: 'Deployment ID',
      value: deploymentId,
    },
    {
      name: 'Node Versions',
      value: nodeVersions,
    },
    {
      name: 'Extension Sync | Total Sync All Count',
      value: extensionSync.totalSyncAllCount,
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

export default ServerInfo;
