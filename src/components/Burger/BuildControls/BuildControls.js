import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from "./BuildControls.module.css"

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}
                 />
        ))}
      <button 
        className={styles.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.showModal}
      >
        ORDER NOW
      </button>
    </div>
);

export default buildControls;