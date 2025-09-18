import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
      name: "Hostname",
      value: hostname,
    },
    {
      name: "Uptime",
      value: uptime,
    },
    {
      name: "Server ID",
      value: serverId,
    },
    {
      name: "Deployment ID",
      value: deploymentId,
    },
    {
      name: "Node Versions",
      value: nodeVersions,
    },
    {
      name: "Extension Sync | Total Sync All Count",
      value: extensionSync.totalSyncAllCount,
    },
  ];

  return (
    <Table aria-label="Server Info">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServerInfo;
