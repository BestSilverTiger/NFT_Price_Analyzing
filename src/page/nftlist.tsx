import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row } from "antd";
import { commonState } from "../reducer/common.reducer";
import { nftlistState, getAllListedNFTs } from "../reducer/nftlist.reducer";
import { AppDispatch, AppSelector } from "../store";
import { pageSize } from "../config/common.config";
import NFTCard from "../component/card/nft.card";

const NFTList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { nfttype, currentPage } = AppSelector(commonState);
  const { allListedNFTs } = AppSelector(nftlistState);

  useEffect(() => {
    dispatch(getAllListedNFTs(String(nfttype)));
  }, []);

  return (
    <Row>
      {allListedNFTs
        .slice(
          pageSize * (currentPage.valueOf() - 1),
          pageSize * currentPage.valueOf()
        )
        .map((nft) => (
          <NFTCard nft={nft} />
        ))}
    </Row>
  );
};

export default NFTList;
