const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const UserSchema = require("../../models/User");

const User = mongoose.model("user", UserSchema);

const omise = require("omise")({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY
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
      if(err){
          res.status(400).json(err)
          console.log(err)
        }else{
            console.log(resp)
            res.status(200).json(resp)
            /* Response. */
        }
   
  });
 }
)

router.post("/recipienttransfer",
passport.authenticate("jwt", { session: false }),
 async (req, res) => {
  await omise.transfers.create({'amount': '10000', 'recipient': 'recp_test_5j9h81xja30msdybwlg'}, function(err, transfer) {
      if(err){
          res.status(400).json(err)
          console.log(err)
        }else{
            console.log(transfer)
            res.status(200).json(transfer)
            /* Response. */
        }
   
  });
 }
)


module.exports = router;
