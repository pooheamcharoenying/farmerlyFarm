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

router.post(
    "/addTeacherPayment",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
        const {name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName} = req.body
      User.findOneAndUpdate(
        { _id: req.user.id},
        {
            teacherPayment_AccountHolderName: req.body.teacherPayment_AccountHolderName,
            teacherPayment_AccountNumber: req.body.teacherPayment_AccountNumber,
            teacherPayment_AccountBank: req.body.teacherPayment_AccountBank
         
        },
        { new: true },
        (err, data) => {
        
          CreateRecipient(name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName,res)
          if (err) {
            res.status(400).json(err)
            console.log("Something wrong when updating data!");
          }
        }
      )
    }
  );

  async function CreateRecipient(name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName,res){
    await omise.recipients.create({
        'name': name,
        'email': email,
        'type': 'individual',
        'bank_account': {
          'brand': teacherPayment_AccountBank,
          'number': teacherPayment_AccountNumber,
          'name': teacherPayment_AccountHolderName
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

module.exports = router;
