import React from 'react';
import s from './button.module.css';

function Button(props) {
  return (
    <button type={props.type} className={s.button}>{props.name}</button>
  )
}

export default Button;
