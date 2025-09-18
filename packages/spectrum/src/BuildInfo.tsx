import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const items = [
    {
      id: "buildVersion",
      name: "Build Version",
      value: buildVersion,
    },
  ];

  return (
    <TableView aria-label="Build Info" width="100%">
      <TableHeader>
        <Column>Name</Column>
        <Column>Value</Column>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <Row key={item.id}>
            <Cell>{item.name}</Cell>
            <Cell>{item.value}</Cell>
          </Row>
        ))}
      </TableBody>
    </TableView>
  );
};

export default BuildInfo;
