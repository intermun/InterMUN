import { useState } from "react";

const Form = props => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentField, setCurrentField] = useState(0);

  const renderStep = index => (
    <>
      <div className="step" key={index} onClick={() => setCurrentStep(index)}>
        <div className="step-number montserrat">Step {index + 1}</div>
        <div className="step-text montserrat">{props.steps[index].name}</div>
        {index === currentStep && <div className="border" />}
      </div>
      <style jsx>{`
        .step {
          height: 100%;
          width: calc(100% / ${props.steps.length});
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 15px;
          position: relative;
          cursor: pointer;
        }
        .step-number {
          padding-bottom: 5px;
          color: ${index === currentStep
            ? "var(--accent-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
        }
        .step-text {
          opacity: 1;
          color: ${index === currentStep
            ? "var(--text-color)"
            : "var(--disabled-text-color)"};
          transition: all 0.5s;
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
    </>
  );

  return (
    <>
      <div id="form">
        <div id="steps">{props.steps.map((_, index) => renderStep(index))}</div>
        <div id="content"></div>
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
        }
        #content {
          flex: 1;
        }
      `}</style>
    </>
  );
};

export default Form;
