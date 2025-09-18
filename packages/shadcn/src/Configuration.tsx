import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = Object.entries(config).reduce<KeyValuePair<string>[]>(
    (previous, [key, value]) => [...previous, { key, value }],
    []
  );

  return (
    <div>
      <h2 className="text-lg font-semibold">Configuration</h2>
      <Table aria-label="Configuration">
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
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Configuration;
