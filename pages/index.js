import React from "react";

const Home = props => {
  const isScrollingAllowed = React.useRef(true);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [pageAnimation, setPageAnimation] = React.useState("");
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

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
        setPageAnimation("");
      }, 500);
    }
  };

  const onDownScroll = () => {
    if (currentPageIndex !== pages.length - 1) {
      isScrollingAllowed.current = false;
      setPageAnimation("nextPageAnimating");
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex => currentPageIndex + 1);
        setPageAnimation("");
      }, 500);
    }
  };

  const getNavHeight = () =>
    props.navRef.current !== null ? props.navRef.current.offsetHeight : 0;

  const onHomeScroll = event => {
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
      <div id="scroll-overlay" onWheel={onHomeScroll} />
      <div id="home" className={pageAnimation}>
        {pages.map(_ => _)}
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
            margin-top: calc(
              -1 * ${currentPageIndex} * (100vh - ${getNavHeight()}px)
            );
          }
          .nextPageAnimating {
            animation: nextPage 0.5s cubic-bezier(0.825, 0.27, 0.895, 0.355);
          }
          .previousPageAnimating {
            animation: previousPage 0.5s cubic-bezier(0.825, 0.27, 0.895, 0.355);
          }
          .page {
            height: 100%;
            width: 100%;
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
