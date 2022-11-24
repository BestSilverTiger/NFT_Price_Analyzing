import React, { useEffect, useState } from "react";
import { Row, Col, Card, Avatar, Divider, List, Skeleton, message } from "antd";
import VirtualList from "rc-virtual-list";
import { useDispatch } from "react-redux";
import { AppDispatch, AppSelector } from "../store";
import { commonState, updateCommonState } from "../reducer/common.reducer";

import { IListedNFT } from "../type";
import ApiService from "../service/api.service";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const BellowLastSale: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { nfttype } = AppSelector(commonState);
  const [data, setData] = useState<IListedNFT[]>([]);
  const [page, setPage] = useState(1);

  const appendData = () => {
    setPage(page + 1);
    ApiService.getListedNFTs(nfttype.toString(), "lastsale", page)
      .then((res) => {
        setData([...data, ...res.data.data]);
      })
      .catch(() => {});
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const handleTokenClick = (token_id: string) => {
    dispatch(
      updateCommonState({
        selectedNFT: token_id,
        nftModalOpen: true,
      })
    );
  };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card title="Bellow Last Sale">
          <List>
            <VirtualList
              data={data}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="token_id"
              onScroll={onScroll}
            >
              {(item: IListedNFT) => (
                <List.Item
                  key={item.token_id.toString()}
                  onClick={() => handleTokenClick(item.token_id.toString())}
                  style={{ cursor: "pointer" }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`${process.env.PUBLIC_URL}/image/nft/boredapeyc/${item.token_id}.png`}
                      />
                    }
                    title={<a href="https://ant.design">{item.token_id}</a>}
                  />
                  <div>
                    {item.sale_history[0].price.toFixed(2)}&nbsp;
                    {item.sale_history[0].payment_token}
                  </div>
                </List.Item>
              )}
            </VirtualList>
          </List>
        </Card>
      </Col>
    </Row>
  );
};

export default BellowLastSale;
