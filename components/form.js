import React, { useState, useEffect, useRef } from "react";
import WindowSizeListener from "./windowSizeListener";

const Form = props => {
  const [currentPair, setCurrentPair] = useState({
    index: 0,
    step: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationState, setAnimationState] = useState("none");
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({});

  const inputRef = useRef(null);

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

  const assign = (obj, keyPath, value) => {
    const lastKeyIndex = keyPath.length - 1;
    for (let i = 0; i < lastKeyIndex; ++i) {
      const key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  const subscriptFormData = (index, step) => {
    const firstPair = formData[props.steps[index].name];
    if (firstPair) {
      return formData[props.steps[index].name][
        props.steps[index].fields[step].placeholder
      ];
    }
    return undefined;
  };

  const goNext = () => {
    const _formData = Object.assign({}, formData);
    assign(
      _formData,
      [
        props.steps[currentPair.index].name,
        props.steps[currentPair.index].fields[currentPair.step].placeholder
      ],
      inputValue
    );
    setFormData(_formData);
    animate("next", "next");
  };

  const goPrev = () => {
    const _formData = Object.assign({}, formData);
    assign(
      _formData,
      [
        props.steps[currentPair.index].name,
        props.steps[currentPair.index].fields[currentPair.step].placeholder
      ],
      inputValue
    );
    setFormData(_formData);
    animate("prev", "prev");
  };

  const animate = (index, step) => {
    if (
      animationState === "none" &&
      !(currentPair.index === 0 && currentPair.step === 0 && index === "prev")
    ) {
      setAnimationState("animating");
      setTimeout(() => {
        if (typeof index === "number" && typeof step === "number") {
          setCurrentPair({ index, step });
        } else if (index === "next" && step === "next") {
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
        } else if (index === "prev" && step === "prev") {
          if (currentPair.step !== 0) {
            setCurrentPair(currentPair => ({
              index: currentPair.index,
              step: currentPair.step - 1
            }));
          } else if (currentPair.index !== 0) {
            setCurrentPair(currentPair => ({
              index: currentPair.index - 1,
              step: props.steps[currentPair.index - 1].fields.length - 1
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
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 800);
    }
  }, [animationState]);

  useEffect(() => {
    const subscript = subscriptFormData(currentPair.index, currentPair.step);
    setInputValue(subscript || "");
  }, [currentPair]);

  const renderFormContent = () => (
    <div id="inner-content">
      <div className="form-button left-button" onClick={goPrev}>
        <div className="triangle triangle-left" />
      </div>
      <div id="form-info">
        <div id="title" className={`montserrat animation ${animationState}`}>
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
          ref={inputRef}
          placeholder={
            props.steps[currentPair.index].fields[currentPair.step].placeholder
          }
          id="input"
          className={`montserrat animation delay-2 ${animationState}`}
          onKeyDown={e => {
            if (e.key === "Enter") {
              goNext();
            }
          }}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </div>
      <div className="form-button right-button" onClick={goNext}>
        <div className="triangle triangle-right" />
      </div>
      <style jsx>
        {`
          #inner-content {
            display: flex;
            align-items: center;
          }
          #form-info {
            flex: 1;
            padding: 0 15px;
          }
          .form-button {
            height: 125px;
            width: 50px;
            background-color: var(--accent-color);
            color: var(--background-color);
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .left-button {
            padding-left: 15px;
          }
          .right-button {
            padding-right: 15px;
          }
          .triangle {
            border-right: 10px solid;
            border-bottom: 10px solid;
            height: 30px;
            width: 30px;
          }
          .triangle-left {
            transform: rotate(135deg);
          }
          .triangle-right {
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
          #input::selection {
            background: white;
            color: black;
          }
        `}
      </style>
    </div>
  );

  const renderDataReview = () => (
    <React.Fragment>
      <div id="final-step">
        <div id="final-data">
          {Object.keys(formData)
            .filter(e => e !== "Review your data")
            .map(key1 => (
              <React.Fragment key={key1}>
                <div
                  className={`montserrat final-step-title animation ${animationState}`}
                >
                  {key1}
                </div>
                {Object.keys(formData[key1]).map(key2 => (
                  <div
                    className={`montserrat animation ${animationState} delay-1`}
                    key={key2}
                  >
                    <span className="final-step-key">{key2}: </span>
                    <span className="final-step-field">
                      {formData[key1][key2]}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
        </div>
        <div id="final-step-buttons">
          <div className="montserrat final-step-button" onClick={goPrev}>
            PREVIOUS
          </div>
          <div className="montserrat final-step-button">CONFIRM</div>
        </div>
      </div>
      <style jsx>{`
        #final-step {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        #final-data {
          overflow: scroll;
          padding: 0 15px;
          flex: 1;
        }
        .final-step-title {
          color: var(--accent-color);
          font-size: 30px;
          margin: 30px 0 15px 0;
        }
        .final-step-field {
          color: white;
          font-size: 20px;
        }
        .final-step-key {
          color: var(--accent-color);
          font-size: 20px;
        }
        #final-step-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 25px;
          padding-bottom: 15px;
        }
        .final-step-button {
          background-color: var(--accent-color);
          color: white;
          padding: 15px;
          border-radius: 15px;
          width: calc(50% - 50px);
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 15px;
          cursor: pointer;
        }
      `}</style>
    </React.Fragment>
  );

  return (
    <>
      <div id="form">
        <div id="steps">{props.steps.map((_, index) => renderStep(index))}</div>
        <div className="border" />
        <div id="content">
          {currentPair.index !== props.steps.length - 1
            ? renderFormContent()
            : renderDataReview()}
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
        }
      `}</style>
      <style jsx global>{`
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
