import React, { useState } from "react";
import { Typography, Card, Row, Col, Select, Avatar } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(10);
  const [newsCate, setNewsCate] = useState("Cryptocurrency");

  const demo =
    "https://th.bing.com/th/id/R.a0036ef34ee381d1a4526391b7ae2bef?rik=tK2QTCvC0c3vvA&pid=ImgRaw&r=0";

  const { data: cryptoNews } = useGetNewsQuery({
    newsCategory: newsCate,
    count: simplified ? 10 : 100,
  });

  if (!cryptoNews?.value) return "Loading....";

  return (
    <>
      <Row gutter={[35, 35]}>
        {!simplified && (
          <Col span={24}>
            <Select
              placeholder="Select A Crypto"
              showsearch
              className="select-news"
              optionFilterProp="childern"
              onChange={(v) => setNewsCate(v)}
              filterOption={(input, option) =>
                option.childern.toLowercase().includes(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Cryptocurrency">
                Cryptocurrency
              </Select.Option>
              {data?.data?.coins?.map((currency) => (
                <Select.Option value={currency.name}>
                  {currency.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((data, i) => (
          <Col lg={8} xs={24} sm={12} key={i}>
            <Card hoverable className={"news-card"}>
              <a href={data.url}>
                <div>
                  <Typography.Title level={4} className="news-title">
                    {data.name}
                  </Typography.Title>
                  <img
                    style={{ mavWidth: "150px", maxHeight: "100px" }}
                    src={data?.image?.thumbnail?.contentUrl || demo}
                  />
                </div>
                <p>
                  {data.description.length > 100
                    ? `${data.description.substring(0, 100)}..`
                    : data.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={data?.image?.thumbnail?.contentUrl || demo}
                    ></Avatar>
                    <Typography.Text className="provider-name">
                      {data.provider[0].name}
                    </Typography.Text>
                  </div>
                  <Typography.Text>
                    {moment(data.datePublished).startOf("ss").fromNow()}
                  </Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
