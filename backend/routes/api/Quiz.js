const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const QuizSchema = require("../../models/Quiz");
const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);
const Quiz = mongoose.model("quiz", QuizSchema);
///////////////////////////////////////////


///ADD Quiz
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
        User.findById( req.user.id ).then(user => {
        Quiz.findOneAndUpdate(
        { questionId: req.body.questionId },
        {          
          questionName: req.body.questionName,
          questionField: req.body.questionField,
            answerType: req.body.answerType,
            answerField: req.body.answerField,
            answerCorrect: req.body.answerCorrect,
            courseName: req.body.courseName,
            sectionName: req.body.sectionName,
            lessionName: req.body.lessionName,
            TeacherId: user._id,
            mediaId:req.body.mediaId,
            answerExplainType: req.body.answerExplainType,
            answerExplainField: req.body.answerExplainField
          
        },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          res.status(200).json(doc);
        }
      );
    
    })

    }
  );
  
  // //Get Media
  // router.post(
  //   "/media",
  //   passport.authenticate("jwt", { session: false }),
  
  //   (req, res) => {
  //     const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
  //     const adjustCourseNameStr = adjustCourseName.toString();
  //     console.log("ppppp")
  //     console.log(req.body.mediaPreview)
  //    if(req.body.mediaPreview){
  //     Quiz.findOne({ questionId: req.body.mediaId }).then(doc => {
  //       res.status(200).json({"status":"200","data":doc});
  //     });
  //    }else{
  //     ///
  //      User.findById(req.user.id).then(async (user) => {
  //       var mock =0
  //       /////
  //       await user.courseSubscription.map(data => {
         
  //           if (data.courseName == adjustCourseNameStr) {
  //             mock =1
  //             Quiz.findOne({ questionId: req.body.mediaId }).then(doc => {
  //               res.status(200).json({"status":"200","data":doc});
               
  //             });
             
  //           }
  //         })
  //           // //////
  //           // /////
  //         await user.TeacherCourse.map(data => {
  //             if (data.courseName == adjustCourseNameStr) {
  //               mock =1
  //               Quiz.findOne({ questionId: req.body.mediaId }).then(doc => {
  //                 res.status(200).json({"status":"200","data":doc});
                 
  //               });
             
  //             }
  //             //////
  //           });
            
  //         if(mock == 0){
            
  //               res.status(200).json({"status":"401","data":''});
             
  //           }  
     
  //     })
  //   }
  // });


//Mock Get Media
router.post("/free", async (req, res) => {
console.log(req.body)
 
  Quiz.findOne({ questionId: req.body.questionId }).then(doc => {
    res.status(200).json({"status":"200","data":doc});
   
  });
  
});

  
  module.exports = router;
  