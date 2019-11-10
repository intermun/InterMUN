import React, { useState, useEffect } from "react";
import _sortBy from "lodash/sortBy";
import Link from "next/link";
import Router from "next/router";

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
  const [menuItems, setMenuItems] = useState([]);
  /*
    there are 4 menu states:
    1. closed: menu fully closed, only logo and toggle shown
    2. closing: animation to close the menu in progress
    3. opened: menu fully opened, all items shown
    4. opening: animation to open the menu in progress
  */
  const [menuState, setMenuState] = useState("closed");

  const isMobile = () => width <= mobileThreshold;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileThreshold) {
        // if mobile, rearrange the items so that the logo is on the top
        setMenuItems(_sortBy(_menuItems, ["index"]));
      } else {
        // if desktop, set the menu items as default
        setMenuItems(_menuItems);
      }
      setWidth(window.innerWidth);
    };
    handleResize();
    const handleRouteChange = () => {
      // when pressing on a link, animate the menu
      setMenuState("closing");
    };
    window.addEventListener("resize", handleResize);
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // finish the animation
      if (menuState === "opening") {
        setMenuState("opened");
      } else if (menuState === "closing") {
        setMenuState("closed");
      }
    }, 500);
  }, [menuState]);

  const toggleMenu = () => {
    // trigger the correct animation
    setMenuState(menuState !== "closed" ? "closing" : "opening");
  };

  return (
    <div id="nav">
      {menuItems.map(
        item =>
          /* 
            always show logo
            show items if:
              desktop mode
              mobile mode and menu open
          */
          (!isMobile() ||
            (isMobile() && menuState !== "closed") ||
            item.src) && (
            <div
              className={`${
                /* 
                  if mobile, make the logo a container for itself and the menu toggle
                  if desktop, make the logo a standard button
                */
                isMobile() && item.src ? "mobile-nav" : "nav-item"
                /* 
                  if mobile, also show the menu state (for animations)
                */
              } ${isMobile() ? menuState : ""} ${
                /* 
                  if it is an image, wrap it in a container
                */
                item.src ? "logo-container" : ""
              } ${
                /*
                  if the animation is running, disable the buttons
                */
                isMobile() &&
                (menuState === "opening" || menuState === "closing")
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
                {/*
                  only show the menu button if on mobile and only next to the logo
                */}
                {isMobile() && item.src && (
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
