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
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossorigin="anonymous"
      ></link>
    </Head>
    <Nav />
    <div id="main-title" className="montserrat">
      INTERMUN
    </div>
    <div id="main-year" className="montserrat">
      2020
    </div>
    <div id="main-info" className="montserrat">
      Coming soon
    </div>
    <style jsx global>{`
      :root {
        --accent-color: #05cfd8;
      }
      * {
        box-sizing: border-box;
      }
      body {
        background-color: #353d4a;
        margin: 0;
      }
      html,
      body,
      #__next,
      #main {
        width: 100%;
        height: 100%;
      }
      .montserrat {
        font-family: "Montserrat";
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 600;
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
