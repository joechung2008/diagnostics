import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useMemo } from "react";

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const items = useMemo(
    () => [
      {
        name: "Build Version",
        value: buildVersion,
      },
    ],
    [buildVersion]
  );

  return (
    <Table aria-label="Build Information" role="table">
      <TableHeader>
        <TableColumn id="build-name-header" scope="col">
          Name
        </TableColumn>
        <TableColumn id="build-value-header" scope="col">
          Value
        </TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell role="cell" headers="build-name-header">
              {item.name}
            </TableCell>
            <TableCell role="cell" headers="build-value-header">
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BuildInfo;
