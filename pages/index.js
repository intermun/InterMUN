import React from "react";

const Home = () => (
  <div id="home">
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
    `}</style>
  </div>
);

export default Home;
