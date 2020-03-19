const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const UserSchema = require("../../models/User");

const User = mongoose.model("user", UserSchema);
const omise = require("omise")({
  publicKey: "pkey_test_5j97ynuc7tsiv55zwxs",
  secretKey: "skey_test_5j97yq3adxxgt4e9pxs"
});


router.post("/creditCard",
passport.authenticate("jwt", { session: false }),
 async (req, res) => {
  const { email,iuid ,courseId, amount, token,pmid } = req.body;
  if(pmid){
    try {
    
  
      const charge = await omise.charges.create({
        amount: amount,
        currency: "thb",
        description:courseId,
        customer: pmid,
        return_uri: "http://localhost:3000/course/",
      });
  
      res.status(200).json({
        authorizeUri: charge.authorize_uri,
        status: charge.status,
        amount: charge.amount / 100
      });
  
  
    } catch (err) {
      res.status(400).json(err)
      console.log(err);
    }
  }else{
    
    try {

      const customer = await omise.customers.create({
        email,
        description: `${iuid}`,
        card: token
      });
  
      const charge = await omise.charges.create({
        amount: amount,
        currency: "thb",
        description:courseId,
        customer: customer.id,
        return_uri: "http://localhost:3000/course/",
      });
  
      User.findOneAndUpdate(
        { _id: req.user.id},
        {
          pmid: customer.id,
         
        },
        { new: true },
        (err, doc) => {
          res.status(200).json({
            authorizeUri: charge.authorize_uri,
            status: charge.status,
            amount: charge.amount / 100
          });
          if (err) {
            res.status(400).json(err)
            console.log("Something wrong when updating data!");
          }
        }
      )
    
  
    } catch (err) {
      console.log(err);
    }

  }


  
});



router.post("/creditRecipient",
passport.authenticate("jwt", { session: false }),
 async (req, res) => {
  await omise.recipients.create({
    'name': 'NSomchai Prasert',
    'email': 'Nsomchai.prasert@example.com',
    'type': 'individual',
    'bank_account': {
      'brand': 'bbl',
      'number': '1234567890',
      'name': 'NSOMCHAI PRASERT'
    }
  }, function(err, resp) {
    console.log(resp)
    res.status(200).json(resp)
    /* Response. */
  });
 }
)


module.exports = router;
