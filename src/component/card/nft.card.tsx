import React, { useEffect, useState } from "react";
import { Card, Col, Skeleton, Badge, Image } from "antd";
import { useDispatch } from "react-redux";
import { commonState, updateCommonState } from "../../reducer/common.reducer";
import {
  nftlistState,
  getAllListedNFTs,
  getSaleHistory,
} from "../../reducer/nftlist.reducer";
import { AppDispatch, AppSelector } from "../../store";
import { IListedNFT } from "../../type";
import { traits } from "../../config/common.config";
import "./nft.card.css";
type Props = {
  nft: IListedNFT;
};

const NFTCard: React.FC<Props> = ({ nft }) => {
  const dispatch: AppDispatch = useDispatch();
  const { nfttype } = AppSelector(commonState);
  const { allListedNFTs } = AppSelector(nftlistState);
  const [highestPrice, setHighestPrice] = useState(0);

  useEffect(() => {
    // @ts-ignore
    let trait_list = traits[nfttype];
    let highestPriceTemp = 0;
    nft.traits.forEach((trait) => {
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

      trait_list = trait_list.filter((trait: String) => {
        return trait !== type;
      });
    });

    trait_list.forEach((trait: String) => {
      let nftListTemp: any = [];
      if (trait == "Count") {
        nftListTemp = allListedNFTs.filter((nftTemp) => {
          return nftTemp.traits.length == nft.traits.length;
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

      if (highestPriceTemp < floor) {
        highestPriceTemp = floor;
      }
    });
    setHighestPrice(highestPriceTemp);
  }, [nft]);

  const handleClick = () => {
    dispatch(
      updateCommonState({
        selectedNFT: nft.token_id,
        nftModalOpen: true,
      })
    );
    dispatch(
      getSaleHistory({
        token_id: nft.token_id,
        nfttype: nfttype.toString(),
      })
    );
  };

  return (
    <Col className="gutter-row mb-10" span={2}>
      <div className="nft-card" onClick={handleClick}>
        <div className="nft-id">
          <span>#{nft.token_id}</span>
          <Badge
            style={{ float: "right" }}
            count={nft.price <= highestPrice ? "Buy" : ""}
          />
        </div>
        <Image
          alt={`${nft.token_id}.png`}
          src={`${process.env.PUBLIC_URL}/image/nft/boredapeyc/${nft.token_id}.png`}
          style={{ width: "100%" }}
          preview={false}
          placeholder={<Skeleton />}
        />
        <div className="nft-price">
          <span>{Number(nft.price.toFixed(3))}</span>
          <span>{Number(highestPrice.toFixed(3))}</span>
        </div>
      </div>
    </Col>
  );
};

export default NFTCard;
