import { Table, Typography } from "antd";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const data = Object.entries(config).map(([key, value]) => ({
    key,
    name: key,
    value: value,
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
      <Typography.Title level={2} style={{ marginBottom: 12 }}>
        Configuration
      </Typography.Title>
      <Table
        aria-label="Configuration"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default Configuration;
