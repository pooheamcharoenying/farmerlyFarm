const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const TagSchema = require("../../models/Tag");
const Tag = mongoose.model("tag", TagSchema, "tag");

///Get Tag
router.post(
  "/gettag",

  (req, res) => {
    Tag.find({
      $or: [
        { english: { $regex: req.body.tag, $options: "i" } },
        { thai: { $regex: req.body.tag, $options: "i" } }
      ]
    })
      .then(tagData => {
        res.status(200).json(tagData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

///Add Tag
router.post(
  "/addtag",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const newTag = new Tag({
        english:req.body.english,
        thai:req.body.thai
    })

    newTag.save().then((data)=>{
        console.log(data)
        res.status(200).json(data)
    }
    ).catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
  }
);

module.exports = router;
