import React, { useState, useEffect, useRef } from "react";
import _sortBy from "lodash/sortBy";
import Link from "next/link";

const _menuItems = [
  {
    href: "/about",
    text: "About",
    index: 0
  },
  {
    href: "/resources",
    text: "Resources",
    index: 1
  },
  {
    href: "/",
    src: "/static/logo.svg",
    index: -1
  },
  {
    href: "/chronicle",
    text: "Chronicle",
    index: 2
  },
  {
    href: "/register",
    text: "Register",
    index: 3
  }
];

const mobileThreshold = 500;

const Nav = () => {
  const [width, setWidth] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [menuState, setMenuState] = useState("closed");

  const navRefs = useRef(
    Array.apply(null, Array(5))
      .fill()
      .map(_ => React.createRef())
  );

  const isMobile = () => width <= mobileThreshold;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileThreshold) {
        setMenuItems(_sortBy(_menuItems, ["index"]));
      } else {
        setMenuItems(_menuItems);
      }
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (showMenu) {
      setMenuState("opening");
    }
    setTimeout(() => {
      setMenuState(showMenu ? "opened" : "closed");
    }, 500);
  }, [showMenu]);

  React.useEffect(() => {
    if (menuState === "opening") {
      setShowMenu(true);
    } else if (menuState === "closing") {
      setTimeout(() => {
        setShowMenu(false);
      }, 500);
    }
  }, [menuState]);

  const toggleMenu = () => {
    if (!showMenu) {
      setMenuState("opening");
    } else {
      setMenuState("closing");
    }
  };

  return (
    <div id="nav">
      {menuItems.map(
        (item, index) =>
          (!isMobile() || (isMobile() && showMenu) || item.src) && (
            <div
              className={
                isMobile() && item.src
                  ? "mobile-nav"
                  : `nav-item ${menuState} ${item.src ? "logo-container" : ""}`
              }
              key={item.index}
              disabled={menuState === "opening" || menuState === "closing"}
            >
              <Link href={item.href}>
                {item.text ? (
                  <a className="montserrat">{item.text}</a>
                ) : isMobile() ? (
                  <>
                    <div id="logo">
                      <img src={item.src} />
                    </div>
                    <i
                      className="fa fa-bars"
                      id="hamburger"
                      onClick={toggleMenu}
                    ></i>
                  </>
                ) : (
                  <img src={item.src} id="logo" />
                )}
              </Link>
            </div>
          )
      )}
      <style jsx>{`
        #hamburger {
          font-size: 40px;
          color: var(--accent-color);
          cursor: pointer;
        }
        .mobile-nav {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px 15px 0;
        }
        #nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          flex-direction: row;
        }
        #logo {
          opacity: 1;
          width: 75px;
          height: 75px;
        }
        .nav-item {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-item:not(.logo-container) {
          height: 20px;
        }
        @media only screen and (max-width: ${mobileThreshold}px) {
          #nav {
            align-items: flex-start;
            padding: 15px 0 0 15px;
            flex-direction: column;
          }
          #logo {
            width: 50px;
            height: 50px;
          }
          .nav-item {
            justify-content: start;
            overflow: hidden;
          }
          .nav-item.closed {
            opacity: 0;
            margin: 0;
            height: 0;
          }
          .nav-item.closing {
            animation: fadeOut 0.5s forwards;
          }
          .nav-item.opening {
            animation: fadeIn 0.5s forwards;
          }
          .nav-item.opened {
            opacity: 1;
            margin: 10px 0;
            height: 20px;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              margin: 0;
              height: 0;
            }
            to {
              opacity: 1;
              margin: 10px 0;
              height: 20px;
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
              margin: 10px 0;
              height: 20px;
            }
            to {
              opacity: 0;
              margin: 0;
              height: 0;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Nav;
