import { HTMLTable } from "@blueprintjs/core";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <h3 className="bp6-heading">Stage Definitions</h3>
      <HTMLTable aria-label="Stage Definitions">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.value.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
};

export default StageDefinition;
