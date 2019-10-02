import React from "react";
import Link from "next/link";

const Nav = () => (
  <div id="nav">
    <div className="nav-item">
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
    <div className="nav-item">
      <Link href="/resources">
        <a>Resources</a>
      </Link>
    </div>
    <div className="nav-item">
      <Link href="/">
        <img src="/static/logo.svg" id="logo" />
      </Link>
    </div>
    <div className="nav-item">
      <Link href="/chronicle">
        <a>Chronicle</a>
      </Link>
    </div>
    <div className="nav-item">
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
    <style jsx>{`
      #nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
      }
      #logo {
        width: 75px;
        height: 75px;
      }
      .nav-item {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

export default Nav;
