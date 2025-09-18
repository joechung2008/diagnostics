import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useMemo } from "react";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = useMemo(
    () =>
      Object.entries(config).reduce<KeyValuePair<string>[]>(
        (previous, [key, value]) => [...previous, { key, value }],
        []
      ),
    [config]
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold" id="configurations">
        Configuration
      </h2>
      <Table aria-labelledby="configurations" role="table">
        <TableHeader>
          <TableColumn id="config-key-header" scope="col">
            Key
          </TableColumn>
          <TableColumn id="config-value-header" scope="col">
            Value
          </TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.key}>
              <TableCell role="cell" headers="config-key-header">
                {item.key}
              </TableCell>
              <TableCell role="cell" headers="config-value-header">
                {item.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Configuration;
