import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

const Home = () => (
  <div id="main">
    <Head>
      <title>Home</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <Nav />
    <div id="main-title">INTERMUN</div>
    <div id="main-year">2020</div>
    <div id="main-info">Coming soon</div>
    <style jsx global>{`
      body {
        background-color: black;
        font-weight: 600;
        margin: 0;
      }
      html,
      body,
      #__next,
      #main {
        width: 100%;
        height: 100%;
      }
      div,
      a {
        font-family: "Montserrat";
        color: white;
        text-decoration: none;
      }
      #main {
        display: flex;
        flex-direction: column;
      }
      #main-title {
        align-self: center;
        font-size: 50px;
        margin-top: 35px;
      }
      #main-year {
        align-self: center;
        font-size: 40px;
      }
      #main-info {
        align-self: center;
        font-size: 35px;
        margin-top: 30px;
      }
    `}</style>
  </div>
);

export default Home;
