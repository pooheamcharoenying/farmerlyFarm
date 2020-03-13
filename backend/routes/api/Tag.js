const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const TagSchema = require("../../models/Tag");
const Tag = mongoose.model("tag", TagSchema,"tag");

///Get Tag
router.post(
    "/gettag",
    
  
    (req, res) => {
        Tag.find({ $or: [ { english: {$regex:req.body.tag, $options: "i"} }, { thai: {$regex:req.body.tag, $options: "i"} } ] }).then(tagData => {
            res.status(200).json(tagData)
        }).catch((err)=>{
            console.log(err);
            res.status(400).json(err)
        })
    }
)

// ///Add Tag
// router.post(
//     "/addtag",
//     passport.authenticate("jwt", { session: false }),
  
//     (req, res) => {
//         Tag.findOneAndUpdate(
//             { questionId: req.body.tag },
//             {          
//               questionName: req.body.questionName,
           
              
//             },
//             { new: true, upsert: true },
//             (err, doc) => {
//               if (err) {
//                 console.log("Something wrong when updating data!");
//               }
//               res.status(200).json(doc);
//             }
//           );
//     }
// )

module.exports = router;
