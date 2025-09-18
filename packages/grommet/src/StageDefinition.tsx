import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <Heading
        level={3}
        margin={{ bottom: "xsmall", horizontal: "none", top: "medium" }}
      >
        Stage Definitions
      </Heading>
      <Table aria-label="Stage Definitions">
        <TableHeader>
          <TableRow>
            <TableCell scope="col">Key</TableCell>
            <TableCell scope="col">Value</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.value.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StageDefinition;
