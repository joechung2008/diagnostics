import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import { createMemo, For } from "solid-js";

function ServerInfo(props: ServerInfoProps) {
  const items = createMemo(() => [
    {
      name: "Hostname",
      value: props.hostname,
    },
    {
      name: "Uptime",
      value: props.uptime,
    },
    {
      name: "Server ID",
      value: props.serverId,
    },
    {
      name: "Deployment ID",
      value: props.deploymentId,
    },
    {
      name: "Node Versions",
      value: props.nodeVersions,
    },
    {
      name: "Extension Sync | Total Sync All Count",
      value: props.extensionSync.totalSyncAllCount,
    },
  ]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Server Info
      </Typography>
      <TableContainer>
        <Table aria-label="Server Info">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={items()}>
              {(item) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ServerInfo;
