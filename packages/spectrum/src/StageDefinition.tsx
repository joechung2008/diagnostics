import {
  Cell,
  Column,
  Heading,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <Heading id="stage-definitions" level={3}>
        Stage Definitions
      </Heading>
      <TableView aria-labelledby="stage-definnitions" width="100%">
        <TableHeader>
          <Column>Key</Column>
          <Column>Value</Column>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <Row key={item.key}>
              <Cell>{item.key}</Cell>
              <Cell>{item.value.join(", ")}</Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
    </div>
  );
};

export default StageDefinition;
