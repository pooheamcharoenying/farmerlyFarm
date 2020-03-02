const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const CourseSchema = require("../../models/Course");
const ContentSchema = require("../../models/Content");
const MediaSchema = require("../../models/Media");
/////////
const Course = mongoose.model("course", CourseSchema);

const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);

///////

//////

router.get("/test", (req, res) => res.json({ msg: "Course Works" }));

//GetCourse
router.get("/", async (req, res) => {
  Course.find({courseActive:true,coursePublish:true})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
});


//GetCourse
router.post("/getcoursesetting",
 (req, res) => {
   console.log(req.body.courseSlug)
  Course.findOne({courseSlug:req.body.courseSlug})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
});

///create Course
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const newCourse = new Course({
      courseSlug: req.body.courseSlug,
      courseName: req.body.courseName,
      courseDescription: req.body.courseDescription,
      courseTeacher: req.body.courseTeacher,
      courseLevel: req.body.courseLevel,
      courseSubject: req.body.courseSubject,
      courseImage:
        req.body.courseImage ||
        "https://studysabaiapp.sgp1.digitaloceanspaces.com/no-image-available-grid.png",
      courseTag: req.body.courseTag,
      courseActive: false,
      coursePublish: false,
      courseOwnerId: req.user.id
    });

    newCourse.save().then(newcourseData => {
      User.findById(req.user.id).then(user => {
        let courseDataId = newcourseData._id.toString();
        user.teacherCourse.unshift({ courseId: courseDataId });

        ///Create Course Content
        const MatchContent = mongoose.model(
          courseDataId,
          ContentSchema,
          courseDataId
        );
        const newContent = new MatchContent({
          name: "plot",
          contentStructure: []
        });

        newContent.save();

        //Create Course Media
        const adjustMediaName = courseDataId + "Media";
        const adjustMediaNameStr = adjustMediaName.toString();
        const MatchMedia = mongoose.model(
          adjustMediaNameStr,
          MediaSchema,
          adjustMediaNameStr
        );
        const newMedia = new MatchMedia({});

        newMedia.save();
        ///Main Resoponse
        user
          .save()
          .then(newuser =>
            res.status(200).json({ newUser: newuser, newCourse: newcourseData })
          )
          .catch(err => console.log(err));
      });
    });
  }
);

//Del
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = (req.body.courseSlug).toString();

    Course.findOne({ courseSlug: adjustCourseSlug }).then(poolData => {
      let courseId = poolData._id.toString();
    const adjustMediaName = courseId + "Media";
    const adjustMediaNameStr = adjustMediaName.toString();

    Course.deleteOne({ courseSlug: adjustCourseSlug }, function(err) {
      res.status(200).json("success");
      if (err) return handleError(err);

      mongoose.connection.db.dropCollection(courseId);
      mongoose.connection.db.dropCollection(adjustMediaNameStr);
    });
  
}).catch(err => console.log(err));
  }
);

//Get By Cat
router.get("/category/:category", async (req, res) => {
  Course.find({ courseSubject: req.params.category })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
  // res.json({ msg: req.params.cat })
});

//Search All

router.get("/search/:keyword", async (req, res) => {
  if (req.params.keyword) {
    Course.find({ courseName: { $regex: req.params.keyword, $options: "i" } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => console.log(err));
  }
});

//Update Course Info
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOneAndUpdate(
      { courseSlug: adjustCourseSlug },
      {
        courseSlug: req.body.NewCourseSlug,
        courseName: req.body.courseName,
        courseDescription: req.body.courseDescription,
        courseTeacher: req.body.courseTeacher,
        courseLevel: req.body.courseLevel,
        courseSubject: req.body.courseSubject,
        courseImage: req.body.courseImage,
        courseTag: req.body.courseTag,
        courseImageFileName: req.body.courseImageFileName
      },
      { new: true },
      (err, doc) => {
        res.status(200).json("success");
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    )
      .then(data => res.status(200).json("success"))
      .catch(err => console.log(err));
  }
);

//Update ActiveStatus
router.post(
  "/status",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOneAndUpdate(
      { courseSlug: adjustCourseSlug },
      {
        courseActive: req.body.courseActive
      },
      { new: true },
      (err, doc) => {
        res.status(200).json("success");
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    )
      .then(data => res.status(200).json("success"))
      .catch(err => console.log(err));
  }
);

//Update publishStatus
router.post(
  "/publish",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOneAndUpdate(
      { courseSlug: adjustCourseSlug },
      {
        coursePublish: req.body.coursePublish
      },
      { new: true },
      (err, doc) => {
        res.status(200).json("success");
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    )
      .then(data => res.status(200).json("success"))
      .catch(err => console.log(err));
  }
);

//Update courseSubscriptor
router.post(
  "/subscriptor",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    User.findById(req.user.id).then(user => {
      Course.find({
        courseSlug: { $regex: adjustCourseSlug, $options: "i" }
      })
        .then(data => {
          Course.courseSubscriptor.unshift({ userId: user._id });
          Course.save().then(data => res.status(200).json("sucess"));
        })
        .catch(err => console.log(err));
    });
  }
);

//Add Structure
router.post(
  "/structureUpdate",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();


    Course.findOne({ courseSlug: adjustCourseSlug }).then(poolData => {
      let courseId = poolData._id.toString();

    const MatchContent = mongoose.model(
      courseId,
      ContentSchema,
      courseId
    );

    
    MatchContent.findOneAndUpdate(
      { name: "plot" },
      {
        contentStructure: req.body.courseStructure,
        CourseInfoOverview: req.body.CourseInfoOverview,
        CourseInfoStudent: req.body.CourseInfoStudent,
        CourseInfoTeacher: req.body.CourseInfoTeacher
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    )
      .then(data => {res.status(200).json("success");console.log(data)})
      .catch(err => console.log(err));



    }).catch(err => {console.log(err);res.status(400).json(err)});

  }
);

//Get Content Struc
router.get("/:courseSlug", async (req, res) => {
  const adjustCourseSlug = req.params.courseSlug.toString();

  Course.findOne({ courseSlug: adjustCourseSlug }).then(poolData => {
    let courseId = poolData._id.toString();
    const MatchCourse = mongoose.model(courseId, ContentSchema, courseId);

    MatchCourse.find()
      .then(courseData => {
        res.status(200).json({ courseData, courseName: poolData.courseName,courseId });
      })
      .catch(err => console.log(err));
  }).catch(err => {console.log(err);res.status(400).json(err)});
});

module.exports = router;
