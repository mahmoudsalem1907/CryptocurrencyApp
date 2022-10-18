import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Card } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [filterdata, setFilterData] = useState("");
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  // console.log(cryptos);

  useEffect(() => {
    const dataFiltering = cryptoList?.data?.coins.filter((e) =>
      e.name.toLowerCase().includes(filterdata.toLowerCase())
    );
    setCryptos(dataFiltering);
  }, [filterdata, cryptos]);

  if (isFetching) return "loading....";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            style={{
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "5px",
              // width: "550px",
            }}
            placeholder="Search"
            onChange={(e) => setFilterData(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((d) => (
          <Col xs={35} lg={6} sm={12} key={d.uuid} className="crypto-card">
            {/* <a useRef={`${d.coinrankingUrl}`}>dsds</a> */}
            {/* <Link to={`/crypto/${d.uuid}`} key={d.uuid}> */}
            <a href={`${d.coinrankingUrl}`}>
              <Card
                title={`${d.rank} . ${d.name}`}
                extra={<img src={d.iconUrl} className="crypto-image" />}
                hoverable
              >
                <p>Price : {millify(d.price)}</p>
                <p>Market : {millify(d.marketCap)}</p>
                <p>Change : {millify(d.change)}</p>
              </Card>{" "}
            </a>
            {/* </Link> */}
            {/* <Link to={`${d.coinrankingUrl}`}>More</Link> */}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
