import React from "react";
import { NextPage } from "next";

type SubPage = {
  backgroundColor: string;
  key: string;
  content: JSX.Element;
};

const pages: SubPage[] = [
  {
    backgroundColor: "green",
    key: "page1",
    content: <>Page 1</>
  },
  {
    backgroundColor: "blue",
    key: "page2",
    content: <>Page 2</>
  }
];

const Home: NextPage<{ navRef: React.RefObject<HTMLDivElement> }> = props => {
  const isScrollingAllowed = React.useRef<boolean>(true);
  const start = React.useRef<React.Touch | null>(null);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [pageAnimation, setPageAnimation] = React.useState<string>("");
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);
  // prettier-ignore
  const [currentBackgroundColor, setCurrentBackgroundColor] = React.useState<string>(pages[0].backgroundColor);

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
      setCurrentBackgroundColor(pages[currentPageIndex - 1].backgroundColor);
      setTimeout(() => {
        setPageAnimation("previousPageAnimating");
        setTimeout(() => {
          setCurrentPageIndex(currentPageIndex => currentPageIndex - 1);
        }, 1000);
      }, 250);
    }
  };

  const onDownScroll = () => {
    if (currentPageIndex !== pages.length - 1) {
      isScrollingAllowed.current = false;
      setCurrentBackgroundColor(pages[currentPageIndex + 1].backgroundColor);
      setTimeout(() => {
        setPageAnimation("nextPageAnimating");
        setTimeout(() => {
          setCurrentPageIndex(currentPageIndex => currentPageIndex + 1);
        }, 1000);
      }, 250);
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

  return (
    <>
      <div
        id="home"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div id="pages" className={`${pageAnimation} pages`}>
          {pages.map((e: SubPage) => (
            <div className="page" key={e.key}>
              {e.content}
            </div>
          ))}
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
            animation: nextPage 0.5s cubic-bezier(0.825, 0.27, 0.895, 0.355)
              forwards;
          }
          .previousPageAnimating {
            animation: previousPage 0.5s cubic-bezier(0.825, 0.27, 0.895, 0.355)
              forwards;
          }
          .page {
            height: calc(100vh - ${getNavHeight()}px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pages {
            background-color: ${currentBackgroundColor};
            transition: background-color 0.75s
              cubic-bezier(0.825, 0.27, 0.895, 0.355);
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
