import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import { createMemo, For } from "solid-js";

function Configuration(props: ConfigurationProps) {
  const items = createMemo(() =>
    Object.entries(props.config).map(([key, value]) => ({ key, value }))
  );

  return (
    <div>
      <Typography
        id="configuration"
        variant="h2"
        color="text.primary"
        sx={{ fontSize: "2rem" }}
      >
        Configuration
      </Typography>
      <TableContainer>
        <Table aria-labelledby="configuration">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={items()}>
              {(item) => (
                <TableRow>
                  <TableCell>{item.key}</TableCell>
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

export default Configuration;
