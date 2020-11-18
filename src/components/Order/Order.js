import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    if (props.ingredients[ingredientName] !== 0) {
      ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      })
    }
  }
  const ingredientOutput = ingredients.map (ingredient => {
    return (
      <span 
        className={styles.OrderPod}
        key={ingredient.name}>
        {ingredient.name} ({ingredient.amount})
      </span>
    )
  })
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p>Price: <strong>{Number(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default order;