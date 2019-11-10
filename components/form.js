import React, { useState } from "react";
import WindowSizeListener from "./windowSizeListener";

const Form = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentField, setCurrentField] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const renderStep = index => (
    <React.Fragment key={`step-${index}`}>
      <WindowSizeListener
        onBecomeMobile={() => setIsMobile(true)}
        onBecomeDesktop={() => setIsMobile(false)}
      />
      <div
        className="step"
        onClick={() => {
          setCurrentIndex(index);
          setCurrentStep(0);
        }}
      >
        <div className="step-number montserrat">Step {index + 1}</div>
        <div className="step-text montserrat">{props.steps[index].name}</div>
        {index === currentIndex && <div className="border" />}
      </div>
      <style jsx>{`
        .step {
          height: 100%;
          width: ${isMobile ? "100%" : `calc(100% / ${props.steps.length})`};
          margin: ${isMobile ? "5px" : "0"} 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 15px;
          position: relative;
          cursor: pointer;
        }
        .step-number {
          padding-bottom: 5px;
          color: ${index === currentIndex
            ? "var(--accent-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
        }
        .step-text {
          opacity: 1;
          color: ${index === currentIndex
            ? "var(--text-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
          margin-bottom: ${isMobile ? "5px" : 0};
        }
        .border {
          width: calc(
            100% * ${currentField + 1} / ${props.steps[index].fields.length}
          );
          height: 2px;
          background-color: var(--accent-color);
          position: absolute;
          left: 0;
          bottom: 0;
        }
      `}</style>
    </React.Fragment>
  );

  const goNext = () => {
    if (currentStep !== props.steps[currentIndex].fields.length - 1) {
      setCurrentStep(currentStep => currentStep + 1);
    } else if (currentIndex !== props.steps.length - 1) {
      setCurrentIndex(currentIndex => currentIndex + 1);
      setCurrentStep(0);
    }
  };

  return (
    <>
      <div id="form">
        <div id="steps">{props.steps.map((_, index) => renderStep(index))}</div>
        <div id="content">
          <div id="inner-content">
            <div id="form-info">
              <div id="title" className="montserrat">
                {props.steps[currentIndex].fields[currentStep].name}
              </div>
              {props.steps[currentIndex].fields[currentStep].additionalInfo && (
                <div id="additional-info" className="montserrat">
                  {props.steps[currentIndex].fields[currentStep].additionalInfo}
                </div>
              )}
              <input
                placeholder={
                  props.steps[currentIndex].fields[currentStep].placeholder
                }
                id="input"
                className="montserrat"
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
          height: 75px;
          width: 100%;
          display: flex;
          flex-direction: ${isMobile ? "column" : "row"};
        }
        #content {
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding-left: 30px;
        }
        #inner-content {
          display: flex;
        }
        #form-info {
          flex: 1;
        }
        #next-button {
          height: 100%;
          width: 50px;
          background-color: var(--accent-color);
          color: var(--background-color);
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
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
      `}</style>
    </>
  );
};

export default Form;
