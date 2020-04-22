const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const TagSchema = require("../../models/Tag");
const Tag = mongoose.model("tag", TagSchema, "tag");

///Get Tag by name
router.post(
  "/gettagbyname",

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


///Get All Tags
router.get(
  "/getalltags",

  (req, res) => {
    Tag.find()
      .then(tagData => {
        res.status(200).json(tagData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);


///Get Tag by id
router.post(
  "/gettagbyid",

  (req, res) => {

    console.log('yoti')
    console.log(req.body.tagList)

    var myList = [];
    for (item of req.body.tagList) {
      myList.push(  mongoose.Types.ObjectId(item.id) )
    }

    Tag.find({'_id': { $in: myList }})
      .then(tagData => {
        res.status(200).json(tagData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

///Get Tag by id
router.post(
  "/updatetagbyid",

  (req, res) => {

    console.log('yamush')
    const update = {
      english: req.body.english,
      thai: req.body.thai,
      subject: req.body.subject,
      approval: req.body.approval,
    }

    Tag.findOneAndUpdate({'_id': req.body.id}, update, {new: true} )
      .then(tagData => {
        console.log('lamouchi')
        console.log(tagData)
        res.status(200).json(tagData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

///Get Tag by id
router.post(
  "/deletetagbyid",

  (req, res) => {


    Tag.deleteOne({'_id': req.body.id} )
      .then(tagData => {
        console.log('lamouchi')
        console.log(tagData)
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
      english: req.body.english,
      thai: req.body.thai,
      subject: req.body.subject,
      approval: req.body.approval
    })

    newTag.save().then((data) => {
      console.log(data)
      res.status(200).json(data)
    }
    ).catch((err) => {
      console.log(err);
      res.status(400).json(err)
    })
  }
);

module.exports = router;
