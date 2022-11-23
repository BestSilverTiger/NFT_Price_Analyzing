import { MenuProps, Spin } from "antd";
import { Layout, Menu, Row, Col } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, AppSelector } from "../store";
import { commonState } from "../reducer/common.reducer";
import { updateNftlistState, nftlistState } from "../reducer/nftlist.reducer";
import {
  getAllListedNFTs,
  getCollectionStats,
} from "../reducer/nftlist.reducer";
import { getEtherPrice } from "../reducer/common.reducer";

import NFTModal from "../component/modal/nft.modal";
import Statistics from "./statistics";
import Recommend from "./recommend";
import BellowLastSale from "./bellowlastsale";
import BestPrice from "./bestprice";
import Furthest from "./furthest";
import TopSale from "./topsale";
import Stats from "./stats";
const { Header, Content, Footer, Sider } = Layout;

const Main: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { nfttype, etherPrice } = AppSelector(commonState);
  const { getAllListedNFTsLoading } = AppSelector(nftlistState);
  useEffect(() => {
    dispatch(
      updateNftlistState({
        getAllListedNFTsLoading: true,
      })
    );
    dispatch(getEtherPrice());
    dispatch(getAllListedNFTs(String(nfttype)));
  });
  return (
    <Layout>
      <Header>{String(etherPrice)}</Header>
      {getAllListedNFTsLoading && (
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Row gutter={16} className="mb-15">
            <Col span={24}>
              <Statistics />
            </Col>
          </Row>
          <Row gutter={16} className="mb-15">
            <Col lg={6} md={12} sm={24} className="mb-15">
              <BestPrice />
            </Col>
            <Col lg={6} md={12} sm={24} className="mb-15">
              <BellowLastSale />
            </Col>
            <Col lg={6} md={12} sm={24} className="mb-15">
              <Furthest />
            </Col>
            <Col lg={6} md={12} sm={24} className="mb-15">
              <TopSale />
            </Col>
          </Row>
          <Row gutter={16} className="mb-15">
            <Col span={24}>
              <Stats />
            </Col>
          </Row>
        </Content>
      )}
      {!getAllListedNFTsLoading && <Spin />}
      <Footer style={{ textAlign: "center" }}>
        NFT Price Analyzing ©2022 Created by Pete Yama
      </Footer>
      <NFTModal />
    </Layout>
  );
};
export default Main;
