import React from "react";
import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputStyles = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) { 
    inputStyles.push(styles.Invalid)
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input 
        className={inputStyles.join(' ')} 
        {...props.elementConfig} 
        onChange={props.change}
        value={props.value}/>;
      break;
    case "textarea":
      inputElement = <textarea 
        className={inputStyles.join(' ')} 
        {...props.elementConfig} 
        onChange={props.change}
        value={props.value}/>;
      break;
    case "select":
      inputElement = (
        <select 
          className={inputStyles.join(' ')} 
          {...props.elementConfig} 
          onChange={props.change}
          value={props.value}>
            {props.elementConfig.options.map(option => (
              <option value={option.value} key={option.value}>
                {option.displayValue}
              </option>
            ))
          }
        </select>
      )
      break;
    default:
      inputElement = <input 
        className={inputStyles.join(' ')} 
        {...props.elementConfig} 
        value={props.value}/>;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
