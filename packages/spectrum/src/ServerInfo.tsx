import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

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
      id: "hostname",
      name: "Hostname",
      value: hostname,
    },
    {
      id: "uptime",
      name: "Uptime",
      value: uptime,
    },
    {
      id: "serverId",
      name: "Server ID",
      value: serverId,
    },
    {
      id: "deploymentId",
      name: "Deployment ID",
      value: deploymentId,
    },
    {
      id: "nodeVersions",
      name: "Node Versions",
      value: nodeVersions,
    },
    {
      id: "extensionSync",
      name: "Extension Sync | Total Sync All Count",
      value: extensionSync.totalSyncAllCount,
    },
  ];

  return (
    <TableView aria-label="Server Info" width="100%">
      <TableHeader>
        <Column>Name</Column>
        <Column>Value</Column>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <Row key={item.id}>
            <Cell>{item.name}</Cell>
            <Cell>{item.value}</Cell>
          </Row>
        ))}
      </TableBody>
    </TableView>
  );
};

export default ServerInfo;
