import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Router from "next/router";

import NavItem from "./NavItem";
import axios from "axios";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Contact", href: "/contact" },
  { text: "Profile", href: "/profile" },
  { text: "Register", href: "/register" },
];
const NavBar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const loginHandle = async () => {
    try {
      await axios.get("/api/login");
      Router.push("/profile");
    } catch (e) {
      console.log(e);
    }
  };
  const logoutHandle = async () => {
    try {
      await axios.get("/api/logout");
      Router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>Development Exercise</Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          <Link href={"/login"} onClick={loginHandle}>
            Login
          </Link>
          <Link href={"/"} onClick={logoutHandle}>
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
