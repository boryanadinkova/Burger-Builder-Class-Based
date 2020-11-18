import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = '';

    for (let param of query.entries()) {
      console.log(param);
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, price: price})
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  }

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients} 
              price={this.state.price} 
              {...props}
            />
          )}
        />
      </div>
    )
  }
}

export default Checkout;