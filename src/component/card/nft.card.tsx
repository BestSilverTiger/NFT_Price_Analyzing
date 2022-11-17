import React, { useEffect, useState } from "react";
import { Col } from "antd";
import { IListedNFT } from "../../type";

type Props = {
  nft: IListedNFT;
};

const NFTCard: React.FC<Props> = ({ nft }) => {
  return (
    <Col className="gutter-row" span={2}>
      <h3>{nft.token_id}</h3>
      <img src={nft.img} style={{ width: "100%" }}></img>
    </Col>
  );
};

export default NFTCard;
