import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import NFTList from "./nftlist";
import NFTModal from "../component/modal/nft.modal";
const { Header, Content, Footer, Sider } = Layout;

const Main: React.FC = () => (
  <Layout>
    <Header></Header>
    <Content>
      <NFTList />
    </Content>
    <Footer style={{ textAlign: "center" }}>
      NFT Price Analyzing ©2022 Created by Pete Yama
    </Footer>
    <NFTModal />
  </Layout>
);

export default Main;
