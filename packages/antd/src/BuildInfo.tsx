import { Table } from "antd";

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const data = [
    {
      key: 0,
      name: "Build Version",
      value: buildVersion,
    },
  ];

  const columns = [
    {
      title: "Name",
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
    <Table
      aria-label="Build Info"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default BuildInfo;
