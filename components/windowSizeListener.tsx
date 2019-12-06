import { useState, useEffect } from "react";

const WindowSizeListener = (props: {
  onBecomeMobile: () => void;
  onBecomeDesktop: () => void;
}) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        props.onBecomeMobile();
      } else {
        props.onBecomeDesktop();
      }
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <></>;
};

export default WindowSizeListener;
