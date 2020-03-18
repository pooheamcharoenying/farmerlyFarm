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
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [
        "internet_banking",
        "bill_payment_tesco_lotus",
        "alipay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { createInternetBankingCharge } = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: this.props.amount,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(this.props.iuid, this.props.courseId, this.props.amount, token);
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.creditCardConfigure();
    this.omiseCardHandler();
  };

  render() {
    const { cart } = this.props;

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
