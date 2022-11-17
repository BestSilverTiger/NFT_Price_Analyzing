import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import { IListedNFT } from "../../type";
import "./nft.card.css";
type Props = {
  nft: IListedNFT;
};

const NFTCard: React.FC<Props> = ({ nft }) => {
  return (
    <Col className="gutter-row mb-10" span={2}>
      <div className="nft-card">
        <div className="nft-id">#{nft.token_id}</div>
        <img
          alt="example"
          src={`${process.env.PUBLIC_URL}/image/nft/boredapeyc/${nft.token_id}.png`}
          style={{ width: "100%" }}
        />
        <div className="nft-price">{nft.price.toFixed(3)}ETH</div>
      </div>
    </Col>
  );
};

export default NFTCard;
