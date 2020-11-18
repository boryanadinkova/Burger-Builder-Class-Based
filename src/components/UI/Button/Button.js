import React from 'react';
import styles from './Button.module.css' 

const button = (props) => (
  <button 
    className={[styles.Button, styles[props.btnType]].join(' ')}
    disabled={props.disabled}
    onClick={props.click}
  > 
    {props.children}
  </button>
)

export default button;