import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Image,
  Skeleton,
  Tag,
} from "antd";
import { Line } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commonState, updateCommonState } from "../../reducer/common.reducer";
import { AppDispatch, AppSelector } from "../../store";
import ApiService from "../../service/api.service";
import { IListedNFT2 } from "../../type";
import "./nft.modal.css";
import { IOrder, ITrait1 } from "../../type/nftlist.type";

const { Title, Text } = Typography;
const { Meta } = Card;

const NFTModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { nftModalOpen, nfttype } = AppSelector(commonState);
  const { selectedNFT } = AppSelector(commonState);

  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenType, setTokenType] = useState("ETH");
  const [tokenData, setTokenData] = useState<IListedNFT2>({
    collection_name: "boredapeyc",
    token_id: "0",
    order: [],
    sale_history: [],
    traits: [],
  });
  const [chartData, setChartData] = useState<IOrder[]>([]);
  const chartConfig = {
    data: chartData,
    xField: "created_date",
    yField: "price",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  useEffect(() => {
    getBalance();
  }, [selectedNFT]);

  const getBalance = async () => {
    const res = await ApiService.getTokenById(
      nfttype.toString(),
      selectedNFT.toString()
    );
    setTokenData(res.data.data);
    if (tokenData.order.length != 0) {
      setTokenPrice(Number(tokenData.order[0].price));
      setTokenType(tokenData.order[0].payment_token.toString());
    }
    if (tokenData.sale_history.length != 0) {
      setChartData(tokenData.sale_history);
    }
  };
  const handleClose = () => {
    dispatch(
      updateCommonState({
        nftModalOpen: false,
      })
    );
  };
  return (
    <Modal
      open={nftModalOpen.valueOf()}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <Row gutter={20}>
        <Col className="gutter-row" span={10}>
          <Card
            style={{ width: "100%", borderRadius: "10px" }}
            bodyStyle={{ display: "flex", justifyContent: "space-between" }}
            cover={
              <Image
                alt={`${selectedNFT}.png`}
                src={`${process.env.PUBLIC_URL}/image/nft/boredapeyc/${selectedNFT}.png`}
                style={{ width: "100%" }}
                preview={false}
                placeholder={<Skeleton />}
              />
            }
          >
            <Meta
              avatar={
                <Avatar
                  size={48}
                  src={`${process.env.PUBLIC_URL}/image/opensea.svg`}
                />
              }
              title={`#${selectedNFT}`}
              description={`${tokenPrice} ${tokenType}`}
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={14}>
          <Row style={{ width: "100%", height: "200px", marginBottom: "35px" }}>
            <Title level={5}>Price History</Title>
            <Line autoFit={true} {...chartConfig} />
          </Row>
          <Row gutter={4}>
            {tokenData.traits.map((floor: ITrait1) => (
              <Col span={12}>
                <Text strong>{floor.trait_type}</Text>
                <div className="trait-floor-price">
                  <Text>{floor.trait_value}</Text>
                  <Tag
                    style={{
                      width: "50px",
                      textAlign: "center",
                      marginRight: "0px",
                      color: "rgb(30, 56, 54)",
                      background: "rgba(229, 231, 235)",
                      borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {Number(floor.floor_price.toFixed(3))}
                  </Tag>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default NFTModal;
