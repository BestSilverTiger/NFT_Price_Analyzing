import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "antd";
import { Line } from "@ant-design/plots";
import { Button, Radio, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Recommend from "./recommend";
interface User {
  key: number;
  name: string;
  price: string;
}

const columns: ColumnsType<User> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "price",
    title: "Price",
    dataIndex: "price",
  },
];

const tableData: User[] = [
  {
    key: 0,
    name: "Jack",
    price: "60 ETH",
  },
  {
    key: 1,
    name: "John",
    price: "60 ETH",
  },
];

const Statistics: React.FC = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("24h");
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };
  return (
    <>
      <Row gutter={16}>
        <Col md={8} sm={12} xs={24} className="mb-10">
          <Card title="Floor Price">17 ETH</Card>
        </Col>
        <Col md={8} sm={12} xs={24} className="mb-10 h-100">
          <Card title="Market Cap">124874 ETH</Card>
        </Col>
        <Col md={8} sm={12} xs={24} className="mb-10 h-100">
          <Card title="24h Volumn">1132.34 ETH</Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col lg={16} md={12} sm={24} className="mb-10">
          <Space
            style={{ width: "100%", justifyContent: "end" }}
            className="mb-5"
          >
            <Radio.Group
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <Radio.Button value="24h">24h</Radio.Button>
              <Radio.Button value="7d">7d</Radio.Button>
              <Radio.Button value="14d">14d</Radio.Button>
              <Radio.Button value="30d">30d</Radio.Button>
              <Radio.Button value="90d">90d</Radio.Button>
              <Radio.Button value="Max">Max</Radio.Button>
            </Radio.Group>
          </Space>
          <Card style={{ height: "470px" }}>
            <Line {...config} />
          </Card>
        </Col>
        <Col lg={8} md={12} sm={24} className="mb-10">
          <Recommend />
        </Col>
      </Row>
    </>
  );
};

export default Statistics;
