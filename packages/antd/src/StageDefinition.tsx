import { Table, Typography } from "antd";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const dataSource = Object.entries(stageDefinition).map(([key, value]) => ({
    key,
    name: key,
    value: Array.isArray(value) ? value.join(", ") : value,
  }));

  const columns = [
    {
      title: "Key",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div>
      <Typography.Title id="stage-definitions-title" level={2}>
        Stage Definitions
      </Typography.Title>
      <Table
        aria-labelledby="stage-definitions-title"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};

export default StageDefinition;
