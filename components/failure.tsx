import React from "react";
export default (hideDialog: () => void) => (
  <>
    <div id="cross">
      <svg viewBox="0 0 500 500" id="cross-svg">
        <line
          className="cross-path"
          id="cross-path-1"
          x1="112.5"
          y1="112.5"
          x2="387.5"
          y2="387.5"
        />
        <path
          className="cross-path"
          id="cross-path-2"
          d="M112.5,387.5L414.36,85.64c1.99-1.99,5.22-1.94,7.16,0.09C462.39,128.39,487.5,186.26,487.5,250
	c0,131.55-105.95,237.5-237.5,237.5C118.83,487.5,12.5,381.17,12.5,250c0-130.93,104.99-236.64,235.92-237.5
	c65.05-0.42,129.97,31.24,173.11,73.22"
        />
      </svg>
      <div id="failure-text" className="montserrat">
        There was an error. Please try again.
      </div>
      <div
        className="montserrat"
        id="cross-button"
        onClick={() => hideDialog()}
      >
        CLOSE
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
      .cross-path {
        fill: none;
        stroke: red;
        stroke-width: 15;
        stroke-miterlimit: 10;
        stroke-linecap: round;
        animation: cross forwards;
      }
      #cross-path-1 {
        stroke-dasharray: 400;
        stroke-dashoffset: 400;
        animation-duration: 1s;
        animation-timing-function: linear;
      }
      #cross-path-2 {
        stroke-dasharray: 2020;
        stroke-dashoffset: 2020;
        animation-duration: 2s;
        animation-delay: 1s;
        animation-timing-function: cubic-bezier(1, 0, 0, 1);
      }
      @keyframes cross {
        to {
          stroke-dashoffset: 0;
        }
      }
      #failure-text {
        margin-top: 15px;
        color: red;
        font-size: 25px;
        text-align: center;
      }
      #cross-button {
        background-color: red;
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
