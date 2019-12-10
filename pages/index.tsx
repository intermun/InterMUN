import React from "react";
import { NextPage } from "next";

const Home: NextPage<{ navRef: React.RefObject<HTMLDivElement> }> = props => {
  const isScrollingAllowed = React.useRef<boolean>(true);
  const start = React.useRef<React.Touch | null>(null);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [pageAnimation, setPageAnimation] = React.useState<string>("");
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);

  React.useEffect(() => forceUpdate(), []);
  React.useEffect(() => setPageAnimation(""), [currentPageIndex]);
  React.useEffect(() => {
    if (pageAnimation === "") {
      isScrollingAllowed.current = true;
    }
  }, [pageAnimation]);

  const onUpScroll = () => {
    if (currentPageIndex !== 0) {
      isScrollingAllowed.current = false;
      setPageAnimation("previousPageAnimating");
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex => currentPageIndex - 1);
      }, 1000);
    }
  };

  const onDownScroll = () => {
    if (currentPageIndex !== pages.length - 1) {
      isScrollingAllowed.current = false;
      setPageAnimation("nextPageAnimating");
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex => currentPageIndex + 1);
      }, 1000);
    }
  };

  const getNavHeight = () => {
    return props.navRef.current?.offsetHeight ?? 0;
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    start.current = event.changedTouches[0];
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const end = event.changedTouches[0];
    if (isScrollingAllowed.current && start.current) {
      end.screenY > start.current.screenY ? onUpScroll() : onDownScroll();
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isScrollingAllowed.current) {
      event.deltaY < 0 ? onUpScroll() : onDownScroll();
    }
  };

  const renderHomePage = () => {
    return (
      <div className="page" key="homePage" id="page1">
        <style jsx>{`
          #page1 {
            background-color: green;
          }
        `}</style>
      </div>
    );
  };

  const renderInfoPage = () => {
    return (
      <div className="page" key="infoPage" id="page2">
        <style jsx>{`
          #page2 {
            background-color: blue;
          }
        `}</style>
      </div>
    );
  };

  const pages = [renderHomePage(), renderInfoPage()];

  return (
    <>
      <div
        id="home"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div id="pages" className={pageAnimation}>
          {pages.map(_ => _)}
        </div>
        <style jsx global>{`
          #scroll-overlay {
            position: fixed;
            width: 100vw;
            height: calc(100vh - ${getNavHeight()}px);
            top: ${getNavHeight()}px;
            left: 0;
          }
          #home {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .nextPageAnimating {
            animation: nextPage 1s cubic-bezier(0.825, 0.27, 0.895, 0.355)
              forwards;
          }
          .previousPageAnimating {
            animation: previousPage 1s cubic-bezier(0.825, 0.27, 0.895, 0.355)
              forwards;
          }
          .page {
            height: calc(100vh - ${getNavHeight()}px);
            width: 100%;
          }
          #pages {
            margin-top: calc(
              -1 * ${currentPageIndex} * (100vh - ${getNavHeight()}px)
            );
          }
          @keyframes nextPage {
            from {
              margin-top: calc(
                -1 * ${currentPageIndex} * (100vh - ${getNavHeight()}px)
              );
            }
            to {
              margin-top: calc(
                -1 * ${currentPageIndex + 1} * (100vh - ${getNavHeight()}px)
              );
            }
          }
          @keyframes previousPage {
            from {
              margin-top: calc(
                -1 * ${currentPageIndex} * (100vh - ${getNavHeight()}px)
              );
            }
            to {
              margin-top: calc(
                -1 * ${currentPageIndex - 1} * (100vh - ${getNavHeight()}px)
              );
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;
