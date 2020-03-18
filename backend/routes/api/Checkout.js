const express = require("express");
const router = express.Router();

const fs = require('fs')
const path = require('path')
const util = require('util')

const omise = require("omise")({
  publicKey: "pkey_test_5j93cbq60rrewraxrkc",
  secretKey: "skey_test_5j93cl8nvl7gvbguy3j"
});
//GetCourse
router.post("/internetbank",
 async (req, res) => {
    try {
        const { iuid, courseId, amount, token } = req.body;
    
        let ttx =  "iuid@fdfd.com"
        const customer = await omise.customers.create({
          ttx,
          description: `${courseId}`,
          card: token
        });
    
        const charge = await omise.charges.create({
          amount: amount,
          currency: "thb",
          customer: customer.id
        });
    
        res.status(200).json({
          authorizeUri: charge.authorize_uri,
          status: charge.status,
          amount: charge.amount / 100
        });
      } catch (err) {
        console.log(err);
      }
});

module.exports = router;
