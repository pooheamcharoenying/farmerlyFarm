const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const QuizSchema = require("../../models/Quiz");
const UserSchema = require("../../models/User");
const CourseSchema = require("../../models/Course");

const User = mongoose.model("user", UserSchema);
const Quiz = mongoose.model("quiz", QuizSchema);
///////////////////////////////////////////
const Course = mongoose.model("course", CourseSchema);





///ADD Quiz
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
  
    (req, res) => {
      const adjustCourseSlug = req.body.courseSlug.toString();

      Course.findOne({ courseSlug: adjustCourseSlug }).then(poolData => {
        let courseId = poolData._id.toString();

     
        User.findById( req.user.id ).then(user => {
        Quiz.findOneAndUpdate(
        { questionId: req.body.questionId },
        {          
          questionName: req.body.questionName,
          questionField: req.body.questionField,
            answerType: req.body.answerType,
            answerField: req.body.answerField,
            answerCorrect: req.body.answerCorrect,
            courseId: courseId,
            courseSlug: req.body.courseSlug,
            sectionName: req.body.sectionName,
            lessionName: req.body.lessionName,
            teacherId: user._id,
            mediaId:req.body.mediaId,
            answerExplainType: req.body.answerExplainType,
            answerExplainField: req.body.answerExplainField,
            quizTagEnglish: req.body.quizTagEnglish,
            quizTagThai: req.body.quizTagThai,
            quizTagStatus: req.body.quizTagStatus
          
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
  }).catch((err)=>console.log(err))
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
  //         await user.teacherCourse.map(data => {
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


//Mock Get Quiz
router.post("/free", async (req, res) => {
 
  Quiz.findOne({ questionId: req.body.questionId }).then(doc => {
    res.status(200).json({"status":"200","data":doc});
   
  });
  
});

  
  module.exports = router;
  