const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const MediaSchema = require("../../models/Media");
const UserSchema = require("../../models/User");
const CourseSchema = require("../../models/Course");

const User = mongoose.model("user", UserSchema);

const Course = mongoose.model("course", CourseSchema);

///ADD Media
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOne({ courseSlug: adjustCourseSlug })
      .then(poolData => {
        let courseId = poolData._id.toString();

        const adjustCourseIdMedia = courseId + "Media";
        const MatchMedia = mongoose.model(
          adjustCourseIdMedia,
          MediaSchema,
          adjustCourseIdMedia
        );

        MatchMedia.findOneAndUpdate(
          { mediaId: req.body.mediaId },
          {
            mediaType: req.body.mediaType,
            mediaPreview: req.body.mediaPreview,
            mediaContent: req.body.mediaContent,
            mediaName: req.body.mediaName,
            mediaTagEnglish: req.body.mediaTagEnglish,
            mediaTagThai: req.body.mediaTagThai,
            mediaTagStatus: req.body.mediaTagStatus
          },
          { new: true, upsert: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
              res.status(400).json(err);
            }
            res.status(200).json(doc);
          }
        );
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

// //Get Media
// router.post(
//   "/media",
//   passport.authenticate("jwt", { session: false }),

//   (req, res) => {

//     const adjustCourseSlug = req.body.courseSlug.toString();

//     Course.findOne({ courseSlug: adjustCourseSlug }).then(poolData => {
//       let courseId = poolData._id.toString();

//       const adjustCourseIdMedia = courseId + "Media";
//     const MatchMedia = mongoose.model(
//       adjustCourseIdMedia,
//       MediaSchema,
//       adjustCourseIdMedia
//     );

//     }).catch((err)=>console.log(err))

//     const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
//     const adjustCourseNameStr = adjustCourseName.toString();
//     const adjustMediaName = adjustCourseNameStr + "Media";
//     const MatchMedia = mongoose.model(
//       adjustMediaName,
//       MediaSchema,
//       adjustMediaName
//     );
//     console.log(req.body.mediaId)
//     //console.log(req.body.mediaPreview)
//    if(req.body.mediaPreview){
//     MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
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
//             MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
//               res.status(200).json({"status":"200","data":doc});

//             });

//           }
//         })
//           // //////
//           // /////
//         await user.teacherCourse.map(data => {
//             if (data.courseName == adjustCourseNameStr) {
//               mock =1
//               MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
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


//Get Media
router.post("/free", async (req, res) => {
  const adjustCourseSlug = req.body.courseSlug.toString();

  Course.findOne({ courseSlug: adjustCourseSlug })
    .then(poolData => {
      let courseId = poolData._id.toString();

      const adjustCourseIdMedia = courseId + "Media";
      const MatchMedia = mongoose.model(
        adjustCourseIdMedia,
        MediaSchema,
        adjustCourseIdMedia
      );

      MatchMedia.findOne({ mediaId: req.body.mediaId })
        .then(doc => {
          res.status(200).json({ status: "200", data: doc });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// //Mock Get Media
// router.post("/lock", async (req, res) => {
//   const adjustCourseName = req.body.courseName.replace(/\s/g, "-");
//   const adjustCourseNameStr = adjustCourseName.toString();
//   const adjustMediaName = adjustCourseNameStr + "Media";
//   const MatchMedia = mongoose.model(
//     adjustMediaName,
//     MediaSchema,
//     adjustMediaName
//   );

//     MatchMedia.findOne({ mediaId: req.body.mediaId }).then(doc => {
//       res.status(200).json({"status":"200","data":doc});
//     }).catch((err)=>console.log(err))

// });




router.post("/deletemediaitemfromdb", async(req,res)  => {
  console.log("yibbo1")
  const courseId = req.body.courseId;
  Course.findOne({ _id: courseId })
    .then(poolData => {
      let courseId = poolData._id.toString();

      const adjustCourseIdMedia = req.body.courseId + "Media";
      const MatchMedia = mongoose.model(
        adjustCourseIdMedia,
        MediaSchema,
      );
      console.log("yibbo2")
      console.log(MatchMedia)

      // delete course from database
      MatchMedia.deleteOne({ mediaId: req.body.mediaId})
        .then(doc => {
          console.log("yibbo3")
          console.log(doc)
          res.status(200).json({ status: "200" });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
        
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

})

module.exports = router;
