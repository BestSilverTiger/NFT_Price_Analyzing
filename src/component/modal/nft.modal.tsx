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
import { nftlistState } from "../../reducer/nftlist.reducer";
import { IListedNFT } from "../../type";
import { traits } from "../../config/common.config";
import "./nft.modal.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const NFTModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { nftModalOpen, selectedNFT } = AppSelector(commonState);
  const { allListedNFTs } = AppSelector(nftlistState);
  const { nfttype } = AppSelector(commonState);

  const [openseaPrice, setOpenseaPrice] = useState(0);
  const [floorPrices, setFloorPrices] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);

  const chartConfig = {
    data: [],
    xField: "date",
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

  useEffect(() => {}, [selectedNFT]);

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
              description={`${openseaPrice} ETH`}
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={14}>
          <Row style={{ width: "100%", height: "200px", marginBottom: "35px" }}>
            <Title level={5}>Price History</Title>
            <Line autoFit={true} {...chartConfig} />
          </Row>
          <Row gutter={4}>
            {floorPrices.map((floor: any) => (
              <Col span={12}>
                <Text strong>{floor.type}</Text>
                <div className="trait-floor-price">
                  <Text>{floor.value}</Text>
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
                    {Number(floor.price.toFixed(3))}
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
