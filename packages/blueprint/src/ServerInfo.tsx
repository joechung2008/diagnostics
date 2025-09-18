import { HTMLTable } from "@blueprintjs/core";

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
    <HTMLTable aria-label="Server Info">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};

export default ServerInfo;
