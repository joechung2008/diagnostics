import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Stage Definitions</h2>
      <Table aria-label="Stage Definitions">
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
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
