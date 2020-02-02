import React from "react";
export default (hideDialog: () => void) => (
  <>
    <div id="cross">
      <svg viewBox="0 0 500 500" id="cross-svg">
        <path
          id="cross-path"
          d="
            M 156.73 251.89
            l 87.8 130.22
            c 2.08 3.09 6.69 2.89 8.5 -0.35
            l 163.5 -292.31
            c 1.57 -2.82 5.45 -3.29 7.64 -0.92
            c 39.6 42.69 63.69 99.96 63.33 162.87
            c -0.75 130.39 -107.56 236.35 -237.95 236.11
            C 118.54 487.26 12.41 380.93 12.5 249.84
            C 12.59 118.31 118.47 12.5 250 12.5
            c 65.7 0 131.17 32.91 174.16 76.03
          "
        />
      </svg>
      <div id="success-text" className="montserrat">
        Successfully registered!
      </div>
      <div className="montserrat" id="cross-button" onClick={hideDialog}>
        HOMEPAGE
      </div>
    </div>
    <style jsx>{`
      #cross {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      #cross-svg {
        width: 250px;
        height: 250px;
      }
      #cross-path {
        fill: none;
        stroke: green;
        stroke-width: 15;
        stroke-miterlimit: 10;
        stroke-dasharray: 2020;
        stroke-dashoffset: 2020;
        stroke-linecap: round;
        animation: cross 3s cubic-bezier(1, 0, 0, 1) forwards;
      }
      @keyframes cross {
        to {
          stroke-dashoffset: 0;
        }
      }
      #success-text {
        margin-top: 15px;
        color: green;
        font-size: 25px;
        text-align: center;
      }
      #cross-button {
        background-color: green;
        color: white;
        padding: 15px;
        border-radius: 15px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30px 15px 0 15px;
        cursor: pointer;
      }
    `}</style>
  </>
);
