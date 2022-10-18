import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "../components/Cryptocurrencies";
import News from "../components/News";
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  console.log(data);
  if (isFetching) return "loading....";
  const GlobalStats = data?.data?.stats;
  // const [s, setS] = useState();

  return (
    <>
      <Typography.Title level={2} className="haeding">
        Global Crypto State
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total CryptoCurrancy" value={GlobalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(GlobalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={GlobalStats.totalExchanges}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(GlobalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={GlobalStats.totalMarkets} />
        </Col>
      </Row>
      <Row className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptocurrencies in The World
        </Typography.Title>
        <Typography.Title level={2} className="show-more">
          <Link to={"/cryptocurrencies"}>Show More</Link>
        </Typography.Title>
      </Row>
      <Cryptocurrencies simplified />
      <Row className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypro News
        </Typography.Title>
        <Typography.Title level={2} className="show-more">
          <Link to={"/news"}>Show More</Link>
        </Typography.Title>
      </Row>
      <News simplified />
    </>
  );
};

export default HomePage;
