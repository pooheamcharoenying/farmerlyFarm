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


// router.post("/recipienttransfer",
// passport.authenticate("jwt", { session: false }),
//  async (req, res) => {
//   await omise.transfers.create({'amount': '10000', 'recipient': 'recp_test_5j9h81xja30msdybwlg'}, function(err, transfer) {
//       if(err){
//           res.status(400).json(err)
//           console.log(err)
//         }else{
//             console.log(transfer)
//             res.status(200).json(transfer)
//             /* Response. */
//         }
   
//   });
//  }
// )

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
        if(req.user.rpid){
            UpdateOmiseRecipient(req,res,name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName,req.user.rpid)

        }else{
            CreateRecipient(req,res,name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName)
            
        }
          if (err) {
            res.status(400).json(err)
            console.log("Something wrong when updating data!");
          }
        }
      )
    }
  );

  async function CreateRecipient(req,res,name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName){
    
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
                UpdateRecipientId(req,res,resp.id)
               
                /* Response. */
            }
       
      });
  }



  async function UpdateRecipientId(req,res,rpid){

    await User.findOneAndUpdate(
        { _id: req.user.id},
        {
          rpid: rpid,
         
        },
        { new: true },
        (err, doc) => {
          res.status(200).json(doc);
          if (err) {
            res.status(400).json(err)
            console.log("Something wrong when updating data!");
          }
        }
      )
  }



  async function UpdateOmiseRecipient(req,res,name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName,rpid){
    // console.log(rpid)
    
    await omise.recipients.update(rpid,
 
        {
          'name': name,
          'email': email,
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
              
               
                /* Response. */
            }
       
      });
  }




//   router.post(
//     "/updateTeacherPayment",
//     passport.authenticate("jwt", { session: false }),
  
//     async (req, res) => {
//         const {name,email,teacherPayment_AccountBank,teacherPayment_AccountNumber,teacherPayment_AccountHolderName} = req.body

//         await omise.recipients.update(req.body.rpid,
 
//           {
//             'name': name,
//             'email': email,
//             'bank_account': {
//               'brand': teacherPayment_AccountBank,
//               'number': teacherPayment_AccountNumber,
//               'name': teacherPayment_AccountHolderName
//             }
//         }, function(err, resp){
//             if(err){
//                 res.status(400).json(err)
//                 console.log(err)
//               }else{
//                   console.log(resp)
//                   UpdateRecipientId(req,res,resp.id)
                 
//                   /* Response. */
//               }
//         });
//     }
//   );


module.exports = router;
