import React from 'react';  
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // Transforms the ingredients object, received as prop, to array, so we can apply map later
  let ingredientsArr = Object.keys(props.ingredients)
    .map(ingredientKey => {
      // constructs an array with all the keys of the ingredientsArr, putting as many elements as the single ingredient value 
      return[...Array(props.ingredients[ingredientKey])].map((el, index) => {
          return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
        }
      ) 
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (ingredientsArr.length === 0) {
    ingredientsArr = <p style={{color: '#703B0A'}}>Please select your ingredients</p>
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {ingredientsArr}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;