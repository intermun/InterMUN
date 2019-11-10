import { useState, useEffect } from "react";

const WindowSizeListener = props => {
  const [width, setWidth] = useState(0);

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
