import React, { useState, useEffect } from "react";
import _sortBy from "lodash/sortBy";
import Link from "next/link";
import Router from "next/router";
import WindowSizeListener from "./windowSizeListener";

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

const Nav = React.forwardRef((props, navRef) => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuState, setMenuState] = useState("closed");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuState("closing");
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (menuState === "opening") {
        setMenuState("opened");
      } else if (menuState === "closing") {
        setMenuState("closed");
      }
    }, 500);
  }, [menuState]);

  const toggleMenu = () => {
    setMenuState(menuState !== "closed" ? "closing" : "opening");
  };

  return (
    <div id="nav" ref={navRef}>
      <WindowSizeListener
        onBecomeMobile={() => {
          setMenuItems(_sortBy(_menuItems, ["index"]));
          setIsMobile(true);
        }}
        onBecomeDesktop={() => {
          setMenuItems(_menuItems);
          setIsMobile(false);
        }}
      />
      {menuItems.map(
        item =>
          (!isMobile || (isMobile && menuState !== "closed") || item.src) && (
            <div
              className={`${isMobile && item.src ? "mobile-nav" : "nav-item"} ${
                isMobile ? menuState : ""
              } ${item.src ? "logo-container" : ""} ${
                isMobile && (menuState === "opening" || menuState === "closing")
                  ? "disabled"
                  : ""
              }`}
              key={item.index}
            >
              <>
                <Link href={item.href}>
                  {item.text ? (
                    <a className="montserrat-default">{item.text}</a>
                  ) : (
                    <img src={item.src} id="logo" />
                  )}
                </Link>
                {isMobile && item.src && (
                  <i
                    className="fa fa-bars"
                    id="hamburger"
                    onClick={toggleMenu}
                  ></i>
                )}
              </>
            </div>
          )
      )}
      <style jsx>{`
        #hamburger {
          font-size: 40px;
          color: var(--text-color);
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
          cursor: pointer;
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
        .disabled {
          pointer-events: none;
        }
        @media only screen and (max-width: 500px) {
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
});

export default Nav;
