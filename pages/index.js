import React from "react";

const Home = () => (
  <div id="home">
    <div id="main-title" className="montserrat info">
      INTERMUN
    </div>
    <div id="main-year" className="montserrat info">
      2020
    </div>
    <div id="main-info" className="montserrat info">
      Coming soon
    </div>
    <style jsx global>{`
      #home {
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
      div[disabled] {
        pointer-events: none;
      }
      .info {
        color: var(--text-color);
      }
    `}</style>
  </div>
);

export default Home;
