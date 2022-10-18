import React from "react";
import { Routes, Link, Route } from "react-router-dom";
import { Space, Typography, Layout } from "antd";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/HomePage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textTransform: "capitalize" }}
          >
            Cryptocurrency <br />
            All Data Reverse
          </Typography.Title>
          <Space>
            <Link to={"/"}>Home</Link>
            <Link to={"/news"}>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
