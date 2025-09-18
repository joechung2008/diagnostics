import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suid/material";
import { createMemo, For } from "solid-js";

function BuildInfo(props: BuildInfoProps) {
  const items = createMemo(() => [
    {
      name: "Build Version",
      value: props.buildVersion,
    },
  ]);

  return (
    <Table aria-label="Build Info">
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
  );
}

export default BuildInfo;
