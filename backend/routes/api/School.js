const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const SchoolSchema = require("../../models/School");
const School = mongoose.model("school", SchoolSchema);
const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);


//GetSchool
router.get("/", async (req, res) => {
 
    School.find()
      .then(data => {
        res.status(200).json(data);
  
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  });


  router.post(
    "/addmynewschool",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      console.log(req.body)
      User.findById(req.user.id)
        .then(user => {
          user.schoolCourse.unshift({ schoolId: req.body.schoolId,schoolApproved:false,schoolCourseList:[] });
  
          user.save().then(user => res.json(user));
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );




  router.post(
    "/findstudentbyschool",
  
    (req, res) => {
      User.find({ "schoolCourse.schoolId": req.body.schoolId },'_id uid role schoolCourse')
        .then(data => {
          res.status(200).json(data)

          // data.map((item)=>{
          //  const fitem = item.schoolCourse.map((sitem)=>sitem.schoolId)
          //  console.log(fitem)
          //  res.status(200).json(item)
          // })

          
         // res.status(200).json(data.filter((item)=>item.schoolCourse.filter((item)=>item.schoolId== "5e7c5b811c9d440000a373a7")));
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  );
module.exports = router;
