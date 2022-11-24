import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import OpenSeaService from "../service/opensea.service";
import LooksrareService from "../service/looksrare.service";
import { AppDispatch, AppSelector } from "../store";
import { commonState } from "../reducer/common.reducer";

interface DataType {
  marketplace: string;
  volumn_24h: number;
  floorprice: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Marketplace",
    dataIndex: "marketplace",
    key: "marketplace",
  },
  {
    title: "24h Volumn",
    dataIndex: "volumn_24h",
    key: "volumn_24h",
  },
  {
    title: "Floor Price",
    dataIndex: "floorprice",
    key: "floorprice",
  },
];

const Stats: React.FC = () => {
  const { nfttype } = AppSelector(commonState);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    let temp: DataType[] = [];
    const res = await OpenSeaService.getCollectionStats(nfttype.toString());
    temp.push({
      marketplace: "OpenSea",
      volumn_24h: Number(res.data.stats.one_day_volume.toFixed(2)),
      floorprice: Number(res.data.stats.floor_price.toFixed(2)),
    });

    const ress = await LooksrareService.getCollectionStats(nfttype.toString());
    temp.push({
      marketplace: "LoosRare",
      volumn_24h: Number(ress.data.data.volume24h / 10 ** 18),
      floorprice: Number(ress.data.data.floorPrice / 10 ** 18),
    });
    setData([...data, ...temp]);
  };

  return <Table pagination={false} columns={columns} dataSource={data} />;
};

export default Stats;
