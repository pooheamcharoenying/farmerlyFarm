import React, { Component } from "react";
import Script from "react-load-script";

import "./Checkout.css";

import { publicKey } from "../../confidential/keys";

let OmiseCard

export class CheckoutInternetBanking extends Component {
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey,
      frameLabel: "Studysabai",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        "bill_payment_tesco_lotus",
        "alipay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    })
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart, createInternetBankingCharge } = this.props;
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
    this.internetBankingConfigure();
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
            id="internet-banking"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            type="button"
            
            onClick={this.handleClick}
          >
            Pay with Internet Banking 
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
