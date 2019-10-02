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

const mobileThreshold = 400;

const Nav = () => {
  const [width, setWidth] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const navRefs = useRef(
    Array.apply(null, Array(5))
      .fill()
      .map(_ => React.createRef())
  );

  const isMobile = () => width < mobileThreshold;

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

  const animate = refToAnimate => {
    let pos = 0;
    const interval = setInterval(() => {
      pos += 10;
      refToAnimate.style.opacity = `${pos}%`;
      if (pos === 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  React.useEffect(() => {
    if (showMenu) {
      navRefs.current.forEach((navRef, index) => {
        if (index > 0) {
          animate(navRef.current);
        }
      });
    }
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div id="nav">
      {menuItems.map(
        (item, index) =>
          (!isMobile() || (isMobile() && showMenu) || item.src) && (
            <div
              className={isMobile() && item.src ? "mobile-nav" : "nav-item"}
              key={item.index}
              ref={navRefs.current[index]}
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
          align-items: ${isMobile() ? "flex-start" : "center"};
          padding: ${isMobile() ? "15px 0 0 15px" : "15px"};
          flex-direction: ${isMobile() ? "column" : "row"};
        }
        #logo {
          opacity: 1;
          width: ${isMobile() ? 75 : 50}px;
          height: ${isMobile() ? 75 : 50}px;
        }
        .nav-item {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: ${isMobile() ? "flex-start" : "center"};
          ${isMobile() ? "margin: 10px 0" : ""}
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Nav;
