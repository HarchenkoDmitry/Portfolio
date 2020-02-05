import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './item.module.css';

function NavItem(props) {
  return (
    <li className={s.item}>
      <NavLink exact to={props.link} className={s.link} activeClassName={s.active}>{props.name}</NavLink>
    </li>
  )
}

export default NavItem;
