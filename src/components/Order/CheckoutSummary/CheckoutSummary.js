import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => { 
  return (
    <div className={styles.CheckoutSummary}>
      <h1>Your delicious burger</h1>
      <div style={{width: '100%', margin: 'auto'}}> 
        <Burger ingredients={props.ingredients}/>
        <Button btnType="Danger" click={props.cancelCheckout}>CANCEL</Button>
        <Button btnType="Success" click={props.continueCheckout}>CONTINUE</Button>
      </div>
    </div>
  )
}

export default CheckoutSummary;