import React from "react";

export type FancyTypes = {
  startAnimation(): void;
  startReverseAnimation(): void;
  stopAnimation(): void;
};

enum AnimationState {
  animating = "animating",
  notAnimating = "not-animating",
  animatingReverse = "animating-reverse"
}

const Fancy: React.RefForwardingComponent<FancyTypes, { index: number }> = (
  { index },
  ref
) => {
  const [animationState, setAnimationState] = React.useState("");
  React.useImperativeHandle(ref, () => ({
    startAnimation: () => {
      setAnimationState(AnimationState.animating);
    },
    stopAnimation: () => {
      setAnimationState(AnimationState.notAnimating);
    },
    startReverseAnimation: () => {
      setAnimationState(AnimationState.animatingReverse);
    }
  }));
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        preserveAspectRatio="none"
      >
        {/* <path
          className="path"
          id="left-path"
          d="
            M 240 0
            l 0 15
            C 240 40 70 145 25 220
            C -30 320 240 500 240 500
          "
        />
        <path
          className="path"
          id="right-path"
          d="
            M 260 0
            l 0 15
            c 0 60 -75 210 -75 270
            C 180 390 260 500 260 500
          "
        /> */}
        <path
          id={`path${index}`}
          className="fill"
          d="
            M 260 500
            c 0 0 -75 -105 -75 -210 
            c 0 -60 75 -210 75 -270 
            L 260 0
            h -20
            l 0 15
            C 240 40 70 145 25 220
            C -30 320 240 500 240 500
            H 260
            z
          "
        />
        <clipPath id={`clip${index}`}>
          <rect
            className={`${animationState} clip-rect`}
            x="0"
            y="0"
            width="100%"
          />
        </clipPath>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#ffafbd" />
          <stop offset="100%" stopColor="#ffc3a0" />
        </linearGradient>
      </svg>
      <style jsx>{`
        #path${index} {
          ${index % 2 == 1
            ? "display: block; transform: scaleX(-1); transform-origin: 50% 50%;"
            : ""}
        }
        .fill {
          stroke: none;
          fill: url(#gradient);
          clip-path: url(#clip${index});
        }
        .clip-rect {
          height: 0;
        }
        .${AnimationState.animating} {
          animation: reveal 2s cubic-bezier(1, 0, 0, 1) forwards;
        }
        .${AnimationState.animatingReverse} {
          height: 100%;
          animation: reveal-reverse 2s cubic-bezier(1, 0, 0, 1) forwards;
        }
        /*
        .path {
          stroke: black;
          fill: none;
          stroke-width: 5px;
          animation: dash 3s linear forwards;
        }
        #left-path {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
        }
        #right-path {
          stroke-dasharray: 530;
          stroke-dashoffset: 530;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        */
        @keyframes reveal {
          to {
            height: 100%;
          }
        }
        @keyframes reveal-reverse {
          from {
            y: 500;
            height: 0;
          }
          to {
            y: 0;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default React.forwardRef(Fancy);
