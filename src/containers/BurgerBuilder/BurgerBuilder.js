import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErronHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 1.5,
  bacon: 1.7,
  cheese: 1.5,
  meat: 2 
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchaseMode: false,
    loading: false,
    error: null
  }

  componentDidMount () {
    axios.get('https://burgerbuilderwithreact-d0b0e.firebaseio.com/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(err => this.setState({ error: true }));
  }

  addIngredientHandler = (type) => {
    const prevQuantity =  this.state.ingredients[type];
    const newQuantity = prevQuantity + 1;
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = newQuantity;

    const priceAddition = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const prevQuantity =  this.state.ingredients[type];
    if (prevQuantity <= 0)
      return;

    const newQuantity = prevQuantity - 1;
    const updatedIngredients = {...this.state.ingredients}
    updatedIngredients[type] = newQuantity;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice - priceSubtraction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (ingredients) => {
    let itemsCount = Object.keys(ingredients)
      .reduce((sum, el) => sum + ingredients[el], 0)

    itemsCount =  itemsCount > 0

    this.setState({purchasable: itemsCount})
  }

  showOrderSummary = () => {
    this.setState({purchaseMode: true})
  }

  hideModalHandler = () => {
    this.setState({purchaseMode: false})
  }
  continuePurchaseHandler = () => {
    this.setState({loading: true})
    
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render () {
    const disabledBtn = {
      ...this.state.ingredients
    }
    for (let key in disabledBtn) {
      disabledBtn[key] = disabledBtn[key] <= 0
    }

    let showOrderSummary = null;
    let burger = this.state.error ? <p>Cannot load ingredients</p> : <Spinner/>;
    
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            addIngredient={this.addIngredientHandler} 
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledBtn}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            showModal={this.showOrderSummary}
            />
        </Aux>
      );

      showOrderSummary = 
        <OrderSummary  
          ingredients={this.state.ingredients} 
          close={this.hideModalHandler} 
          continue={this.continuePurchaseHandler} 
          totalPrice={this.state.totalPrice}
        />
    }
    
    if (this.state.loading) {
      showOrderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchaseMode}
          close={this.hideModalHandler}>
          {showOrderSummary}
        </Modal>
        { burger }
      </Aux>
    )
  }
}

export default withErronHandler(BurgerBuilder, axios);