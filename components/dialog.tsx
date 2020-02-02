import React from "react";

export type DialogTypes = {
  config(body: JSX.Element): void;
  hide(): void;
};

enum AnimationState {
  showing = "animating-show",
  exiting = "animating-hide"
}

const Dialog: React.RefForwardingComponent<
  DialogTypes,
  { setIsHidden(flag: boolean): void }
> = ({ setIsHidden }, ref) => {
  // prettier-ignore
  const [animationState, setAnimationState] = React.useState(AnimationState.showing);
  const [content, setContent] = React.useState<JSX.Element>(<></>);
  React.useEffect(() => {
    if (animationState === AnimationState.exiting) {
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    }
  }, [animationState]);
  React.useEffect(() => {}, [content]);
  React.useImperativeHandle(ref, () => ({
    config: (body: JSX.Element) => {
      setContent(body);
    },
    hide: () => {
      setAnimationState(AnimationState.exiting);
    }
  }));
  const onClickOutside = () => {
    setAnimationState(AnimationState.exiting);
  };
  return (
    <>
      <div
        id="dialog-overlay"
        className={`overlay-${animationState}`}
        onClick={onClickOutside}
      />
      <div id="dialog" className={`dialog-${animationState}`}>
        {content}
      </div>
      <style jsx>{`
        #dialog-overlay {
          width: 100vw;
          height: 100vh;
          background-color: black;
          opacity: 0.75;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 98;
        }
        #dialog {
          width: 75vw;
          height: 75vh;
          background-color: var(--background-color);
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -37.5vh;
          margin-left: -37.5vw;
          z-index: 99;
        }
        .overlay-animating-show {
          animation: overlayShowAnimation 1s ease-in-out forwards;
        }
        .dialog-animating-show {
          animation: dialogShowAnimation 1s ease-in-out forwards;
        }
        .overlay-animating-hide {
          animation: hideAnimation 1s ease-in-out forwards;
        }
        .dialog-animating-hide {
          animation: hideAnimation 1s ease-in-out forwards;
        }
        @keyframes overlayShowAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.75;
          }
        }
        @keyframes dialogShowAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes hideAnimation {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default React.forwardRef(Dialog);
