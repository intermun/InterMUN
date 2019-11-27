import React, { useState, useEffect } from "react";
import WindowSizeListener from "./windowSizeListener";

const Form = props => {
  const [currentPair, setCurrentPair] = useState({
    index: 0,
    step: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationState, setAnimationState] = useState("none");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderStep = index => (
    <React.Fragment key={`step-${index}`}>
      <WindowSizeListener
        onBecomeMobile={() => setIsMobile(true)}
        onBecomeDesktop={() => setIsMobile(false)}
      />
      <div
        className="step"
        onClick={() => {
          animate(index, 0);
        }}
      >
        <div className="step-number montserrat">Step {index + 1}</div>
        <div className="step-text montserrat">{props.steps[index].name}</div>
      </div>
      <style jsx>{`
        .step {
          height: ${isMobile ? "50px" : "100%"};
          width: ${isMobile ? "100%" : `calc(100% / ${props.steps.length})`};
          margin: ${isMobile ? "5px" : "0"} 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 15px;
          cursor: pointer;
        }
        .step-number {
          padding-bottom: 5px;
          color: ${index === currentPair.index
            ? "var(--accent-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
        }
        .step-text {
          opacity: 1;
          color: ${index === currentPair.index
            ? "var(--text-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
          margin-bottom: ${isMobile ? "5px" : 0};
        }
      `}</style>
    </React.Fragment>
  );

  const goNext = () => {
    animate(null, null);
  };

  const animate = (index, step) => {
    console.log(index, step);
    if (animationState === "none") {
      setAnimationState("animating");
      setTimeout(() => {
        if (index !== null && step !== null) {
          setCurrentPair({ index, step });
        } else {
          if (
            currentPair.step !==
            props.steps[currentPair.index].fields.length - 1
          ) {
            setCurrentPair(currentPair => ({
              index: currentPair.index,
              step: currentPair.step + 1
            }));
          } else if (currentPair.index !== props.steps.length - 1) {
            setCurrentPair(currentPair => ({
              index: currentPair.index + 1,
              step: 0
            }));
          }
        }
        setAnimationState("reverting");
      }, 800);
    }
  };

  useEffect(() => {
    if (animationState === "reverting") {
      setTimeout(() => {
        setAnimationState("none");
      }, 800);
    }
  }, [animationState]);

  return (
    <>
      <div id="form">
        <div id="steps">{props.steps.map((_, index) => renderStep(index))}</div>
        <div className="border" />
        <div id="content">
          <div id="inner-content">
            <div id="form-info">
              <div
                id="title"
                className={`montserrat animation ${animationState}`}
              >
                {props.steps[currentPair.index].fields[currentPair.step].name}
              </div>
              {props.steps[currentPair.index].fields[currentPair.step]
                .additionalInfo && (
                <div
                  id="additional-info"
                  className={`montserrat animation delay-1 ${animationState}`}
                >
                  {
                    props.steps[currentPair.index].fields[currentPair.step]
                      .additionalInfo
                  }
                </div>
              )}
              <input
                placeholder={
                  props.steps[currentPair.index].fields[currentPair.step]
                    .placeholder
                }
                id="input"
                className={`montserrat animation delay-2 ${animationState}`}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    goNext();
                  }
                }}
              />
            </div>
            <div id="next-button" className="montserrat" onClick={goNext}>
              <div id="triangle" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #form {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        #steps {
          width: 100%;
          display: flex;
          flex-direction: ${isMobile ? "column" : "row"};
        }
        .border {
          width: ${isLoaded
            ? `calc(
            100% * ${currentPair.index} / ${props.steps.length} + 100% /
              ${props.steps.length} * ${currentPair.step + 1} /
              ${props.steps[currentPair.index].fields.length}
          )`
            : 0};
          height: 2px;
          background-color: var(--accent-color);
          transition: 0.5s ease all;
          margin-top: 5px;
        }
        #content {
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding-left: 15px;
          overflow: scroll;
        }
        #inner-content {
          display: flex;
          align-items: center;
        }
        #form-info {
          flex: 1;
        }
        #next-button {
          height: 125px;
          width: 50px;
          background-color: var(--accent-color);
          color: var(--background-color);
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding-right: 15px;
        }
        #triangle {
          border-right: 10px solid;
          border-bottom: 10px solid;
          height: 30px;
          width: 30px;
          transform: rotate(-45deg);
        }
        #title {
          color: rgba(255, 255, 255, 0.75);
          font-size: 20px;
          margin-bottom: 5px;
        }
        #additional-info {
          color: rgba(255, 255, 255, 0.5);
          font-size: 15px;
        }
        #input {
          background-color: transparent;
          outline: none;
          border: none;
          color: white;
          font-size: 25px;
          margin-top: 20px;
          width: 100%;
          caret-color: var(--accent-color);
        }
        .animation {
          position: relative;
        }
        @keyframes animating {
          from {
            opacity: 1;
            top: 0;
          }
          to {
            opacity: 0;
            top: 20px;
          }
        }
        @keyframes reverting {
          from {
            opacity: 0;
            top: -20px;
          }
          to {
            opacity: 1;
            top: 0;
          }
        }
        .animating {
          animation: animating 0.5s forwards;
        }
        .reverting {
          opacity: 0;
          top: -20px;
          animation: reverting 0.5s forwards;
        }
        .delay-1 {
          animation-delay: 0.15s;
        }
        .delay-2 {
          animation-delay: 0.3s;
        }
      `}</style>
    </>
  );
};

export default Form;
