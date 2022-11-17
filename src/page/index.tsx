import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import NFTList from "./nftlist";

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
  </Layout>
);

export default Main;
