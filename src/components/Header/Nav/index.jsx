import React from 'react';
import NavItem from './NavItem';
import s from "./nav.module.css";

function Nav() {
  return (
    <nav>
      <ul className={s.list}>
        <NavItem link={"/"} name={"Hello"}/>
        <NavItem link={"/resume"} name={"Resume"}/>
        <NavItem link={"/portfolio"} name={"Portfolio"}/>
        <NavItem link={"/contacts"} name={"Contacts"}/>
      </ul>
    </nav>
  )
}

export default Nav;
