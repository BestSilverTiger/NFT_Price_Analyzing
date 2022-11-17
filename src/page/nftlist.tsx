import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Pagination } from "antd";
import type { PaginationProps } from "antd";
import { commonState, updateCommonState } from "../reducer/common.reducer";
import { nftlistState, getAllListedNFTs } from "../reducer/nftlist.reducer";
import { AppDispatch, AppSelector } from "../store";
// import { pageSize } from "../config/common.config";
import NFTCard from "../component/card/nft.card";

const NFTList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { nfttype } = AppSelector(commonState);
  const { allListedNFTs } = AppSelector(nftlistState);

  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(getAllListedNFTs(String(nfttype)));
  }, []);

  const handlePaginationChange: PaginationProps["onChange"] = (
    pageNumber,
    pageSize
  ) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  return (
    <>
      <Row>
        <Pagination
          showQuickJumper
          pageSize={pageSize}
          defaultCurrent={1}
          total={allListedNFTs.length}
          onChange={handlePaginationChange}
          style={{ float: "right" }}
        />
      </Row>
      <Row gutter={16} style={{ padding: "10px" }}>
        {allListedNFTs
          .slice(
            pageSize * (pageNumber.valueOf() - 1),
            pageSize * pageNumber.valueOf()
          )
          .map((nft) => (
            <NFTCard nft={nft} />
          ))}
      </Row>
    </>
  );
};

export default NFTList;
