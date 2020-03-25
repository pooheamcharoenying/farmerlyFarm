import React, { Component } from "react";
import Script from "react-load-script";

import "./Checkout.css";

import { publicKey } from "../../confidential/keys";

let OmiseCard;

export class Checkout extends Component {
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey,
      frameLabel: "Studysabai",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card"
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { createCreditCardCharge } = this.props;
    OmiseCard.open({
      frameDescription: this.props.courseId,
      amount: this.props.amount*100,
      onCreateTokenSuccess: token => {
        createCreditCardCharge(this.props.courseId, this.props.amount*100, token);
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    if(this.props.pmid){
      this.props.createCreditCardCharge(this.props.courseId, this.props.amount*100, "token");
    }else{
      this.creditCardConfigure();
      this.omiseCardHandler();
    }
   
  };

  render() {

    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleScriptLoad}
        />

        <form>
          <button
            id="credit-card"
            className="bg-blue-300 text-white p-2 rounded hover:bg-blue-400"
            type="button"
         
            onClick={this.handleClick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
