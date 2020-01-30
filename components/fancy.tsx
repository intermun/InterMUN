import React from "react";
import Color from "color";

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

const Fancy: React.RefForwardingComponent<
  FancyTypes,
  { index: number; color: string }
> = ({ index, color }, ref) => {
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
        <path
          id={`path${index}`}
          className="fill"
          d="
            M 240 0
            c 0 0 0 18.37 0 19.83
            c 0 71.5 -170.61 115.99 -214.3 189.38
            C -28.61 300.44 240 393.4 240 479.67
            c 0 12.37 0 20.33 0 20.33
            h 20
            c 0 0 0 -15.94 0 -20.33
            c 0 -55.52 -77.48 -110.98 -76.61 -208.46
            c 0.51 -56.84 74.77 -185.76 76.48 -251.45
            C 260 14.85 260 0 260 0
            L 240 0
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
        <linearGradient id={`gradient${index}`} gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="black" />
          <stop
            offset="50%"
            stopColor={Color(color)
              .lighten(0.75)
              .saturate(0.5)
              .string()}
          />
          <stop offset="100%" stopColor="black" />
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
          fill: url(#gradient${index});
          clip-path: url(#clip${index});
        }
        .clip-rect {
          height: 0;
        }
        .${AnimationState.animating} {
          animation: reveal 3s cubic-bezier(1, 0, 0, 1) forwards;
        }
        .${AnimationState.animatingReverse} {
          height: 100%;
          animation: reveal-reverse 3s cubic-bezier(1, 0, 0, 1) forwards;
        }
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
