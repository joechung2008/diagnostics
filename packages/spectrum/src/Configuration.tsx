import {
  Cell,
  Column,
  Heading,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = Object.entries(config).reduce<KeyValuePair<string>[]>(
    (previous, [key, value]) => [...previous, { key, value }],
    []
  );

  return (
    <div>
      <Heading id="configuration" level={3}>
        Configuration
      </Heading>
      <TableView aria-labelledby="configuration" width="100%">
        <TableHeader>
          <Column>Key</Column>
          <Column>Value</Column>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <Row key={item.key}>
              <Cell>{item.key}</Cell>
              <Cell>{item.value}</Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
    </div>
  );
};

export default Configuration;
