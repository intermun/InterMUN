import React, { useState, useEffect, useRef } from "react";
import WindowSizeListener from "./windowSizeListener";
import I18n from "../i18n/i18n";
import firebase from "../helpers/firebase";
import { NextPage } from "next";
import { Step, StepField } from "../pages/register";
import { DialogTypes } from "./dialog";
import success from "./success";
import failure from "./failure";

import { useRouter } from "next/router";

type FormData = {
  [key: string]: {
    [key: string]: string;
  };
};

const Form: NextPage<{
  steps: Step[];
  dialogRef: React.MutableRefObject<DialogTypes | null>;
  configDialog(content: JSX.Element): void;
  hideDialog(callback?: () => void): void;
}> = props => {
  const router = useRouter();
  const [currentPair, setCurrentPair] = useState<{
    step: number;
    field: number;
  }>({
    step: 0,
    field: 0
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<string>("none");
  const [errorAnimationState, setErrorAnimationState] = useState<string>(
    "error-none"
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({});
  const [showError, setShowError] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const _formData = Object.assign({}, formData);
    assign(
      _formData,
      { stepName: getCurrentStep().name, fieldId: getCurrentField().id },
      inputValue
    );
    setFormData(_formData);
  }, [inputValue]);

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
    const subscript = subscriptFormData(currentPair.step, currentPair.field);
    setInputValue(subscript || "");
  }, [currentPair]);

  const getStep = (step: number): Step => {
    return props.steps[step];
  };

  const getCurrentStep = (): Step => {
    return props.steps[currentPair.step];
  };

  const getField = (step: number, field: number): StepField => {
    return props.steps[step].fields[field];
  };

  const getCurrentField = (): StepField => {
    return getField(currentPair.step, currentPair.field);
  };

  const assign = (
    obj: FormData,
    keys: { stepName: string; fieldId: string },
    value: string
  ): void => {
    if (obj[keys.stepName] === undefined) {
      obj[keys.stepName] = {};
    }
    obj[keys.stepName][keys.fieldId] = value;
  };

  const subscriptFormData = (
    step: number,
    field: number
  ): string | undefined => {
    if (formData[getStep(step).name] === undefined) {
      return undefined;
    }
    return formData[getStep(step).name][getField(step, field).id];
  };

  const goNext = (): void => {
    if (
      subscriptFormData(currentPair.step, currentPair.field)?.trim() === "" &&
      getCurrentField().required
    ) {
      animateError();
      return;
    }
    const toTest = subscriptFormData(
      currentPair.step,
      currentPair.field
    )?.trim();
    if (
      toTest !== undefined &&
      getCurrentField().regex?.test(toTest) === false
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }
    animate("next", "next");
  };

  const goPrev = (): void => {
    animate("prev", "prev");
  };

  const sendFormData = async () => {
    const processedData: any = {};
    Object.entries(formData).forEach(el => {
      Object.entries(el[1]).forEach(item => {
        if (item[0] !== "") {
          processedData[item[0]] = item[1];
        }
      });
    });
    try {
      await firebase
        .firestore()
        .collection("delegates")
        .add(processedData);
      props.configDialog(
        success(() =>
          props.hideDialog(() => {
            router.push("/");
          })
        )
      );
    } catch (error) {
      props.configDialog(failure(props.hideDialog));
    }
  };

  const jumpTo = (index: number, step: number): void => {
    if (index === currentPair.step && step === currentPair.field) {
      return;
    }
    if (
      (index > currentPair.step ||
        (index === currentPair.step && step > currentPair.field)) &&
      subscriptFormData(currentPair.step, currentPair.field)?.trim() === "" &&
      getCurrentField().required
    ) {
      animateError();
      return;
    }
    const toTest = subscriptFormData(
      currentPair.step,
      currentPair.field
    )?.trim();
    if (
      (index > currentPair.step ||
        (index === currentPair.step && step > currentPair.field)) &&
      toTest !== undefined &&
      getCurrentField().regex?.test(toTest) === false
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }
    animate(index, 0);
  };

  const animateError = (): void => {
    setErrorAnimationState("error-animating");
    setTimeout(() => {
      setErrorAnimationState("error-none");
    }, 1000);
  };

  const animate = (index: number | string, step: number | string): void => {
    if (
      animationState === "none" &&
      !(currentPair.step === 0 && currentPair.field === 0 && index === "prev")
    ) {
      setAnimationState("animating");
      setTimeout(() => {
        if (typeof index === "number" && typeof step === "number") {
          setCurrentPair({ step: index, field: step });
        } else if (index === "next" && step === "next") {
          if (currentPair.field !== getCurrentStep().fields.length - 1) {
            setCurrentPair(currentPair => ({
              step: currentPair.step,
              field: currentPair.field + 1
            }));
          } else if (currentPair.step !== props.steps.length - 1) {
            setCurrentPair(currentPair => ({
              step: currentPair.step + 1,
              field: 0
            }));
          }
        } else if (index === "prev" && step === "prev") {
          if (currentPair.field !== 0) {
            setCurrentPair(currentPair => ({
              step: currentPair.step,
              field: currentPair.field - 1
            }));
          } else if (currentPair.step !== 0) {
            setCurrentPair(currentPair => ({
              step: currentPair.step - 1,
              field: getStep(currentPair.step - 1).fields.length - 1
            }));
          }
        }
        setAnimationState("reverting");
      }, 800);
    }
  };

  const renderStep = (index: number): JSX.Element => (
    <React.Fragment key={`step-${index}`}>
      <WindowSizeListener
        onBecomeMobile={() => setIsMobile(true)}
        onBecomeDesktop={() => setIsMobile(false)}
      />
      <div
        className="step"
        onClick={() => {
          jumpTo(index, 0);
        }}
      >
        <div className="step-number montserrat">Step {index + 1}</div>
        <div className="step-text montserrat">{getStep(index).name}</div>
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
          color: ${index === currentPair.step
            ? "var(--accent-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
        }
        .step-text {
          opacity: 1;
          color: ${index === currentPair.step
            ? "var(--text-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
          margin-bottom: ${isMobile ? "5px" : 0};
        }
      `}</style>
    </React.Fragment>
  );

  const renderFormContent = (): JSX.Element => (
    <div id="inner-content">
      <div className="form-button left-button" onClick={goPrev}>
        <div className="triangle triangle-left" />
      </div>
      <div id="form-info">
        <div id="title" className={`montserrat animation ${animationState}`}>
          {getCurrentField().name}
        </div>
        {getCurrentField().required && (
          <div
            id="additional-info"
            className={`montserrat animation delay-1 ${animationState} ${errorAnimationState}`}
          >
            Required
          </div>
        )}
        <input
          ref={inputRef}
          placeholder={getCurrentField().placeholder}
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
        {showError && getCurrentField().errorText !== undefined && (
          <div id="error-text" className="montserrat">
            {getCurrentField().errorText}
          </div>
        )}
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
          #error-text {
            animation: errorAnimatingAndDisappearing 2s ease-in-out forwards;
          }
          .error-animating {
            animation: errorAnimating 1s ease-in-out forwards, shake 1s forwards;
          }
          @keyframes errorAnimatingAndDisappearing {
            0% {
              height: 0;
              opacity: 0;
              color: rgba(255, 255, 255, 0.5);
            }
            25% {
              height: 20px;
              opacity: 1;
              color: red;
            }
            75% {
              height: 20px;
              opacity: 1;
              color: red;
            }
            100% {
              height: 0;
              opacity: 0;
              color: rgba(255, 255, 255, 0.5);
            }
          }
          @keyframes errorAnimating {
            0% {
              color: rgba(255, 255, 255, 0.5);
            }
            50% {
              color: red;
            }
            100% {
              color: rgba(255, 255, 255, 0.5);
            }
          }
          @keyframes shake {
            10%,
            90% {
              transform: translate3d(-1px, 0, 0);
            }

            20%,
            80% {
              transform: translate3d(2px, 0, 0);
            }

            30%,
            50%,
            70% {
              transform: translate3d(-4px, 0, 0);
            }

            40%,
            60% {
              transform: translate3d(4px, 0, 0);
            }
          }
        `}
      </style>
    </div>
  );

  const renderDataReview = (): JSX.Element => (
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
                    <span className="final-step-key">{I18n.t(key2)}: </span>
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
          <div className="montserrat final-step-button" onClick={sendFormData}>
            CONFIRM
          </div>
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
          {currentPair.step !== props.steps.length - 1
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
            100% * ${currentPair.step} / ${props.steps.length} + 100% /
              ${props.steps.length} * ${currentPair.field + 1} /
              ${getCurrentStep().fields.length}
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
