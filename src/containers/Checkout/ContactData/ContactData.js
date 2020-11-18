import React, { Component } from "react";
import axios from "../../../axios-orders";
import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Str No",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      userDetails: formData,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ loading: false }));
  };

  checkValidity(value, rules) {
    let isValid = true;

    // if conditions are met, will assign value true to isValid
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    // returns true or false
    return isValid;
  }

  userInputHandler = (event, inputIdentifier) => {
    // clone OrderFrom
    const clonedOrderForm = {
      ...this.state.orderForm,
    };
    // deep copy OrderForm
    const clonedOrderFormElement = { ...clonedOrderForm[inputIdentifier] };
    // set old input value equal to onChange value
    clonedOrderFormElement.value = event.target.value;
    // check if input is valid - checkValidity will return true/false
    clonedOrderFormElement.valid = this.checkValidity(
      clonedOrderFormElement.value,
      clonedOrderFormElement.validation
    );
    clonedOrderFormElement.touched = true;
    // merge updated value
    clonedOrderForm[inputIdentifier] = clonedOrderFormElement;

    let formIsValid = true;

    // set valid property for all elements in the form object
    for (let inputIdentifier in clonedOrderForm) {
      formIsValid = clonedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: clonedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArr = [];

    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    console.log(formElementsArr);

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map((formElement) => (
          <Input
            key={formElement.id}
            change={(event) => this.userInputHandler(event, formElement.id)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            value={formElement.config.value}
          />
        ))}
        <Button
          btnType="Success"
          click={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
        {/* <Button btnType="Danger" click={this.props.history.push('/')}>CANCEL</Button> */}
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Contact info</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
