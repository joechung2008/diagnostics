import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = Object.entries(config).reduce<KeyValuePair<string>[]>(
    (previous, [key, value]) => [...previous, { key, value }],
    []
  );

  return (
    <div>
      <Heading
        level={3}
        margin={{ bottom: "xsmall", horizontal: "none", top: "medium" }}
      >
        Configuration
      </Heading>
      <Table aria-label="Configuration">
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
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Configuration;
