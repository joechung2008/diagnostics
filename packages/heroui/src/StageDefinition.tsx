import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <h2 className="text-2xl font-semibold" id="stage-definitions">
        Stage Definitions
      </h2>
      <Table aria-labelledby="stage-definitions" role="table">
        <TableHeader>
          <TableColumn id="stage-key-header" scope="col">
            Key
          </TableColumn>
          <TableColumn id="stage-value-header" scope="col">
            Value
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.key}>
              <TableCell role="cell" headers="stage-key-header">
                {item.key}
              </TableCell>
              <TableCell role="cell" headers="stage-value-header">
                {item.value.join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StageDefinition;
