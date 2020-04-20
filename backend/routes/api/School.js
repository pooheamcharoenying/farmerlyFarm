const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const SchoolSchema = require("../../models/School");
const School = mongoose.model("school", SchoolSchema);
const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);
const CourseSchema = require("../../models/Course");
const Course = mongoose.model("course", CourseSchema);


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
      
      User.findById(req.user.id)
        .then(user => {
            console.log(user.schoolCourse.filter((item)=>item.schoolId == req.body.schoolId))



          if(user.schoolCourse.filter((item)=>item.schoolId == req.body.schoolId)[0]){
            res.status(400).json({err:"existing"})
          }else{
            user.schoolCourse.unshift({ schoolId: req.body.schoolId,schoolApproved:false,schoolCourseList:[] });
            user.save().then(user => res.json(user));
          }
  
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );


  router.post(
    "/removemyschool",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      console.log('removeMySchool')
      console.log(req.body)
      console.log(req.user.id)
      User.findById(req.user.id)
        .then(user => {
            console.log(user.schoolCourse.filter((item)=>item.schoolId == req.body.schoolId))

            const tempArray = user.schoolCourse;
            for (index in tempArray) {
              if (tempArray[index].schoolId == req.body.schoolId) {
                user.schoolCourse.splice(index,1)
                user.save().then(user => res.json(user));
                console.log('schoolRemoveFromUserSuccess')
              }
            }
  
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );



  router.post(
    "/changestudentschoolstatusAction",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      console.log(req.body)
      User.findOne({"uid":req.body.userId})
        .then(user => {
        

          let SchoolMatch = user.schoolCourse.map((item)=>item.schoolId)
          let SchoolIndex = SchoolMatch.indexOf(req.body.schoolId)
          user.schoolCourse[SchoolIndex].schoolApproved = req.body.status
          user.schoolCourse[SchoolIndex].SchoolCourseList = []


          user.save().then((user) => {
            if(req.body.status){
              School.findOneAndUpdate({ _id: req.body.schoolId }, { $inc: { schoolRemainingStudentQuota: -1 } }, {new: true },function(err, response) {
                if (err) {
                console.log(err);
               } else {
                 console.log("user")
            res.status(200).json(response);
               }})

            }else{

              School.findOneAndUpdate({ _id: req.body.schoolId }, { $inc: { schoolRemainingStudentQuota: 1 } }, {new: true },function(err, response) {
                if (err) {
                console.log(err);
               } else {
                res.status(200).json(response);
            console.log("user")

               }})
            }


          });
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );



  router.post(
    "/findstudentbyschool",
  
    (req, res) => {
      User.find({ "schoolCourse.schoolId": req.body.schoolId },'_id uid role schoolCourse')
        .then(data => {

          const newData = data.map((item)=>{
           const fitem = item.schoolCourse.filter((sitem)=>sitem.schoolId == req.body.schoolId)
           console.log("fitem")
           console.log(fitem)

          
           return{
             uid:item.uid,
             schoolApproved:fitem[0].schoolApproved
          }
          })
          res.status(200).json(newData)

          

          
         // res.status(200).json(data.filter((item)=>item.schoolCourse.filter((item)=>item.schoolId== "5e7c5b811c9d440000a373a7")));
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  );

  router.post(
    "/getstudentschoolcourse",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      console.log(req.body)
      console.log('SeverusSnape')
      console.log(req.body)
      User.findOne({"uid":req.body.uid})
        .then(user => {
          console.log('user')
          console.log(user)
          console.log('userSchoolCourse')
          console.log(user.schoolCourse)
          let SchoolMatch = user.schoolCourse.map((item)=>item.schoolId)
          console.log('SchoolMatch')
          console.log(SchoolMatch)
          let SchoolIndex = SchoolMatch.indexOf(req.body.schoolId)
          

          res.json(user.schoolCourse[SchoolIndex])
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );

  router.post(
    "/getmatchschoolcourse",
   
  
    (req, res) => {
      console.log(req.body)
      Course.find({courseSchoolId:req.body.schoolId})
        .then(matchCourse => {
          
          res.json(matchCourse)
        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );

  router.post(
    "/assigncoursetouser",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      console.log(req.body)
      User.findOne({"uid":req.body.userUid})
        .then(user => {
        

          let SchoolMatch = user.schoolCourse.map((item)=>item.schoolId)
          let SchoolIndex = SchoolMatch.indexOf(req.body.schoolId)
          user.schoolCourse[SchoolIndex].SchoolCourseList.push( req.body.courseId)
        
          user.save().then((newuser) => {
            res.json(newuser.schoolCourse[SchoolIndex])
          })

        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );

  router.post(
    "/delcoursetouser",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      User.findOne({"uid":req.body.userId})
        .then(user => {
          
          console.log('delcourseuser')
          console.log(req.body)

          let SchoolMatch = user.schoolCourse.map((item)=>item.schoolId)
          let SchoolIndex = SchoolMatch.indexOf(req.body.schoolId)
          let SchoolCourseIdIndex = user.schoolCourse[SchoolIndex].SchoolCourseList.map((item)=>item._id).indexOf(req.body.courseId)
          
          console.log("before")
          console.log(user.schoolCourse[SchoolIndex].SchoolCourseList)

          
          user.schoolCourse[SchoolIndex].SchoolCourseList.splice(SchoolCourseIdIndex,1)
        
          console.log("after")
          console.log(user.schoolCourse[SchoolIndex].SchoolCourseList)
          user.save().then((newuser) => {
            res.json(newuser.schoolCourse[SchoolIndex])
          })

        })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );

  router.post(
    "/getschoolidbyslug",
    
  
    (req, res) => {
      console.log(req.body)
     
      School.find({schoolSlug:req.body.schoolSlug}).then((data)=>{
        res.status(200).json(data)
      })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );


  router.post(
    "/getschoolinfobyid",
    
  
    (req, res) => {
      console.log(req.body)
     
      School.findOne({_id:req.body.schoolId}).then((data)=>{
        res.status(200).json(data)
      })
        .catch(err => {console.log(err);res.status(400).json(err)});
    }
  );


module.exports = router;
