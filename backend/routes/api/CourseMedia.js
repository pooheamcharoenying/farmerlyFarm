const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const MediaSchema = require("../../models/Media");
const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);

// router.get("/:coursename", async (req, res) => {
//   const MatchCourse = mongoose.model((req.params.coursename + "media"), MediaSchema);
//   //const token = req.query.token;
//   //console.log(token);
//   MatchCourse.find().then(data => {
//         res.status(200).json(data);
//       });
//   // if (req.body.token) {
//   //   MatchCourse.findById(req.body.mediaId).then(data => {
//   //     res.status(200).json(data);
//   //   });
//   // } else {
//   //   res.status(401).json("Unauthorized error");
//   // }
// });


///ADD Media
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
    const adjustCourseNameStr = adjustCourseName.toString();
    const adjustMediaName = adjustCourseNameStr + "Media";
    const MatchMedia = mongoose.model(
      adjustMediaName,
      MediaSchema,
      adjustMediaName
    );

    MatchMedia.findOneAndUpdate(
      { mediaId: req.body.mediaId },
      {
        mediaType: req.body.mediaType,
        mediaPreview: req.body.mediaPreview,
        mediaContent: req.body.mediaContent,
        mediaName: req.body.mediaName
      },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        res.status(200).json(doc);
      }
    );
  }
);

//Get Media
router.post(
  "/media",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
    const adjustCourseNameStr = adjustCourseName.toString();
    const adjustMediaName = adjustCourseNameStr + "Media";
    const MatchMedia = mongoose.model(
      adjustMediaName,
      MediaSchema,
      adjustMediaName
    );
    console.log(req.body.mediaId)
    //console.log(req.body.mediaPreview)
   if(req.body.mediaPreview){
    MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
      res.status(200).json({"status":"200","data":doc});
    });
   }else{
    ///
     User.findById(req.user.id).then(async (user) => {
      var mock =0
      /////
      await user.courseSubscription.map(data => {
       
          if (data.courseName == adjustCourseNameStr) {
            mock =1
            MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
              res.status(200).json({"status":"200","data":doc});
             
            });
           
          }
        })
          // //////
          // /////
        await user.TeacherCourse.map(data => {
            if (data.courseName == adjustCourseNameStr) {
              mock =1
              MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
                res.status(200).json({"status":"200","data":doc});
               
              });
           
            }
            //////
          });
          
        if(mock == 0){
          
              res.status(200).json({"status":"401","data":''});
           
          }  
   
    })
  }
});
//Get Media
router.post("/free", async (req, res) => {
  const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
  const adjustCourseNameStr = adjustCourseName.toString();
  const adjustMediaName = adjustCourseNameStr + "Media";
  const MatchMedia = mongoose.model(
    adjustMediaName,
    MediaSchema,
    adjustMediaName
  );
 
    MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
      res.status(200).json({"status":"200","data":doc});
    });
  
});

//Mock Get Media
router.post("/lock", async (req, res) => {
  const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
  const adjustCourseNameStr = adjustCourseName.toString();
  const adjustMediaName = adjustCourseNameStr + "Media";
  const MatchMedia = mongoose.model(
    adjustMediaName,
    MediaSchema,
    adjustMediaName
  );
 
    MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
      res.status(200).json({"status":"200","data":doc});
    }).catch((err)=>console.log(err))
  
});

module.exports = router;
