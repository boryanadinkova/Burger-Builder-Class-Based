import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const orderSummary = Object.keys(props.ingredients).map((ingredient) => {
    return props.ingredients[ingredient] ? (
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
        {props.ingredients[ingredient]}
      </li>
    ) : (
      ""
    );
  });

  return (
    <Aux>
      <h3>Your order:</h3>
      <p>Ingredients for your burger:</p>
      <ul>{orderSummary}</ul>
      <p>
        <strong>TOTAL PRICE: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Success" click={props.close}>
        CANCEL
      </Button>
      <Button btnType="Danger" click={props.continue}>
        CHECKOUT
      </Button>
    </Aux>
  );
};

export default orderSummary;
