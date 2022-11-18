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
  const { allListedNFTs, priceHistory } = AppSelector(nftlistState);
  const { nfttype } = AppSelector(commonState);

  const [openseaPrice, setOpenseaPrice] = useState(0);
  const [floorPrices, setFloorPrices] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);

  const chartConfig = {
    data: priceHistory,
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

  useEffect(() => {
    let floorPricesTemp: any = [];
    let nftTemp = allListedNFTs.filter((nft) => {
      return nft.token_id == selectedNFT;
    });
    if (nftTemp.length == 0) {
      return;
    }
    let token_traits = nftTemp[0].traits;
    setOpenseaPrice(nftTemp[0].price);
    // @ts-ignore
    let trait_temp = traits[nfttype];
    let highestPriceTemp = 0;
    token_traits.forEach((trait) => {
      let type = trait.type;
      let value = trait.value;
      let nftListTemp = allListedNFTs.filter((nft) => {
        let traits_temp = nft.traits.filter((trait) => {
          return trait.type === type && trait.value === value;
        });
        return traits_temp.length == 1;
      });
      const floor = Math.min.apply(
        Math,
        nftListTemp.map((nfttemp) => {
          return nfttemp.price;
        })
      );
      if (highestPriceTemp < floor) {
        highestPriceTemp = floor;
      }
      floorPricesTemp.push({
        type: type,
        value: value,
        price: floor,
      });
      trait_temp = trait_temp.filter((trait: String) => {
        return trait !== type;
      });
    });

    trait_temp.forEach((trait: String) => {
      let nftListTemp: any = [];
      if (trait == "Count") {
        nftListTemp = allListedNFTs.filter((nftTemp) => {
          return nftTemp.traits.length == token_traits.length;
        });
      } else {
        nftListTemp = allListedNFTs.filter((nftTemp) => {
          let traits_temp = nftTemp.traits.filter((trait) => {
            return trait.type === String(trait);
          });
          return traits_temp.length == 0;
        });
      }

      const floor = Math.min.apply(
        Math,
        nftListTemp.map((nfttemp: any) => {
          return nfttemp.price;
        })
      );
      let value = trait == "Count" ? token_traits.length.toString() : "none";
      floorPricesTemp.push({
        type: trait,
        value: value,
        price: floor,
      });
      if (highestPriceTemp < floor) {
        highestPriceTemp = floor;
      }
    });
    setFloorPrices(floorPricesTemp);
    setHighestPrice(highestPriceTemp);
  }, [selectedNFT]);

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
      <Row gutter={8}>
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
          <Row style={{ width: "100%", height: "200px", marginBottom: "15px" }}>
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
