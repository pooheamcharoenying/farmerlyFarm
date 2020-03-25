const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const CourseSchema = require("../../models/Course");
const ContentSchema = require("../../models/Content");
const MediaSchema = require("../../models/Media");
const QuizSchema = require("../../models/Quiz");
/////////
const Course = mongoose.model("course", CourseSchema);

const Quiz = mongoose.model("quiz", QuizSchema);

const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);

const SubjectSchema = require("../../models/Subject");
const Subject = mongoose.model("subjects", SubjectSchema);

const SubjectMenuSchema = require("../../models/Menu");
console.log('SubjectMenuSchema')
console.log(SubjectMenuSchema)
const Menu = mongoose.model("menu", SubjectMenuSchema);

const SubjectLevelSchema = require("../../models/SubjectLevel");
const Level = mongoose.model("levels", SubjectLevelSchema);
///////

//////

router.get("/test", (req, res) => res.json({ msg: "Course Works" }));

//GetCourse
router.get("/", async (req, res) => {
  console.log(
    "hhhhhhhhhhhhhoooooooooooommmmmmmmmmmmmmmmmmmmmmmeeeeeeeeeeeeeeeeeeeeeee"
  );

  Course.find({ courseActive: true, coursePublish: true })
    .then(data => {
      res.status(200).json(data);
      // console.log('course')
      // console.log(data)
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

// delete all question items in quiz
router.post("/deleteQuizQuestions", (req, res) => {
  console.log(req.body);
  const id = req.body.mediaId;
  console.log("deleting questions in quiz");
  Quiz.deleteMany({ mediaId: id })
    .then(data => {
      console.log("quiz result 1");
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

const axios = require("axios").default;
const accessToken = "dbaa8374efa89cf873fbe48e6fd7be3e";
const headerPost = {
  Accept: "application/vnd.vimeo.*+json;version=3.4",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json"
};

// move uploaded vimeo video to correct course folder
router.post("/moveVideoFolder", (req, res) => {
  console.log("send request to vimeo server");
  console.log(req.body);

  axios({
    method: "put",
    url:
      "https://api.vimeo.com/me/projects/" +
      req.body.videoFolderId +
      "/videos/" +
      req.body.videoId,
    headers: headerPost,
    data: {}
  })
    .then(res => {
      console.log("video moved to folder");
      console.log(res);
    })
    .catch(err => {
      message.error("video move to folder Error, Try Again");
      console.log(err);
      return res.status(400).json(err);
    });
});

// tell Vimeo to create new course video folder
router.post("/createVimeoFolder", (req, res) => {
  console.log("send request to vimeo server");
  console.log(req.body);

  var tempCourseSlug = req.body.courseSlug;
  axios({
    method: "post",
    url: "https://api.vimeo.com/me/projects",
    headers: headerPost,
    data: {
      name: req.body.folderName
    }
  })
    .then(res => {
      console.log("vimeo folder successfully created");
      const folderId = res.data.uri.replace("/users/98773046/projects/", "");
      console.log(folderId);
      console.log(req.body.courseName);
      Course.findOneAndUpdate(
        { courseName: req.body.courseName },
        { courseVimeoId: folderId },
        function(err, result) {
          if (err) {
            return res.status(400).json(err);
          } else {
            console.log("success");
            console.log(result);
          }
        }
      );
    })
    .catch(err => {
      message.error("video move to folder Error, Try Again");
      console.log(err);
      return res.status(400).json(err);
    });
});

// tell Vimeo to change folder name (not complete yet)
router.post("/editVimeoFolderName", (req, res) => {
  console.log("editing vimeo folder name");
  console.log(req.body.folderName);
  axios({
    method: "patch",
    url: "https://api.vimeo.com/me/projects/" + req.body.vimeoId,
    headers: headerPost,
    data: {
      name: req.body.folderName
    }
  })
    .then(res => {
      console.log("vimeo folder name sucessfully edited");
    })
    .catch(err => {
      message.error("folder name change error");
      console.log(err);
      return res.status(400).json(err);
    });
});

// tell Vimeo to delete video
router.post("/deleteVimeoVideo", (req, res) => {
  console.log("editing vimeo folder name");
  console.log(req.body.folderName);
  axios({
    method: "patch",
    url: "https://api.vimeo.com/me/projects/" + req.body.vimeoId,
    headers: headerPost,
    data: {
      name: req.body.folderName
    }
  })
    .then(res => {
      console.log("vimeo folder name sucessfully edited");
    })
    .catch(err => {
      message.error("folder name change error");
      console.log(err);
      return res.status(400).json(err);
    });
});

//GetSubjects
router.get("/subjects", async (req, res) => {
  Subject.find()
  .then(data => {
    res.status(200).json(data);
    console.log('subject data')
    console.log(data)
  })
  .catch(err => {
    console.log(err);
    return res.status(400).json(err)
  });
});



//GetSubjects Levls
router.get("/subjectLevels", async (req, res) => {

  Level.find()
  .then(data => {
    // console.log('getting subject levels')
    res.status(200).json(data);
    // console.log(data)
  })
  .catch(err => {
    console.log(err);
    return res.status(400).json(err)});
});


//GetCourse
router.get("/all", async (req, res) => {
  Course.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

//GetCourse
router.post("/getcoursesetting", (req, res) => {
  Course.findOne({ courseSlug: req.body.courseSlug })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

///create Course
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {

    console.log(req.body)
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
      courseOwnerId: req.user.id,
      courseImageFileName: req.body.courseImageFileName,
      courseFee: req.body.courseFee,
      coursePrice: req.body.coursePrice,
      courseTagEnglish: req.body.courseTagEnglish,
      courseTagThai: req.body.courseTagThai,
      courseVimeoId: req.body.courseVimeoId,
      coursePublic:req.body.coursePublic,
      courseSchool:req.body.courseSchool
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
          contentStructure: [],
          CourseInfoOverview: "",
          CourseInfoStudent: "",
          CourseInfoTeacher: "",
          courseReview: []
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
          .catch(err => {
            console.log(err);
            return res.status(400).json(err);
          });
      });
    });
  }
);

//Del
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOne({ courseSlug: adjustCourseSlug })
      .then(poolData => {
        let courseId = poolData._id.toString();
        const adjustMediaName = courseId + "Media";
        const adjustMediaNameStr = adjustMediaName.toString();

        // delete course from database
        Course.deleteOne({ courseSlug: adjustCourseSlug }, function(err) {
          res.status(200).json("success");
          if (err) return handleError(err);

          mongoose.connection.db.dropCollection(courseId);
          mongoose.connection.db.dropCollection(adjustMediaNameStr);
        });

        // delete vimeo folder and videos in it
        console.log("preparing to delete vimeo folder");
        axios({
          method: "delete",
          url: "https://api.vimeo.com/me/projects/" + req.body.vimeoId,
          headers: headerPost,
          data: {
            should_delete_clips: true
          }
        })
          .then(res => {
            console.log("vimeo folder sucessfully delete");
          })
          .catch(err => {
            message.error("vimeo folder delete error");
            console.log(err);
            return res.status(400).json(err);
          });

        // detele all questions from course
        console.log("prepare to delete all qeuestions in course");
        Quiz.deleteMany({ courseSlug: req.body.courseSlug })
          .then(data => {
            console.log("deleted all questions from course");
            console.log(data);
          })
          .catch(err => {
            console.log(err);
            return res.status(400).json(err);
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
);

//Get By Cat
router.get("/category/:category", async (req, res) => {
  Course.find({ courseSubject: req.params.category })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
  // res.json({ msg: req.params.cat })
});

//Search All

router.get("/search/:keyword", async (req, res) => {
  if (req.params.keyword) {
    Course.find({ courseName: { $regex: req.params.keyword, $options: "i" } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
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
        courseImageFileName: req.body.courseImageFileName,
        coursePrice: req.body.coursePrice,
        courseFee: req.body.courseFee,
        courseTagEnglish: req.body.courseTagEnglish,
        courseTagThai: req.body.courseTagThai,
        coursePublic:req.body.coursePublic,
        courseSchool:req.body.courseSchool
      },
      { new: true },
      (err, doc) => {
        // res.status(200).json("success");
        if (err) {
          console.log("Something wrong when updating data!");
          return res.status(400).json(err)
        }
      }
    )
      .then(data => res.status(200).json("success"))
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
);

router.post(
  "/setreview",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const courseIdStr = req.body.courseId.toString();
    const MatchContent = mongoose.model(
      courseIdStr,
      ContentSchema,
      courseIdStr
    );

    MatchContent.findOne({ name: "plot" })
      .then(courseData => {
        const isUserReviewExist = courseData.courseReview
          .map(data => data.iuser)
          .indexOf(req.body.courseReview.iuser);
        if (isUserReviewExist == -1) {
          courseData.courseReview.unshift(req.body.courseReview);
          courseData.save();
          res.status(200).json(courseData.courseReview);
        } else {
          courseData.courseReview.splice(isUserReviewExist, 1);
          courseData.courseReview.unshift(req.body.courseReview);
          courseData.save();

          res.status(200).json(courseData.courseReview);
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
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
          return res.status(400).json(err);
        }
      }
    )
      .then(data => res.status(200).json("success"))
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
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
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
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
        .catch(err => {
          console.log(err);
          return res.status(400).json(err);
        });
    });
  }
);

//Add Structure
router.post(
  "/structureUpdate",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const adjustCourseSlug = req.body.courseSlug.toString();

    Course.findOne({ courseSlug: adjustCourseSlug })
      .then(poolData => {
        let courseId = poolData._id.toString();

        const MatchContent = mongoose.model(courseId, ContentSchema, courseId);

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
          .then(data => {
            res.status(200).json("success");
            console.log(data);
          })
          .catch(err => {
            console.log(err);
            return res.status(400).json(err);
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err);
      });
  }
);

//Get Content Struc
router.get("/:courseSlug", async (req, res) => {
  const adjustCourseSlug = req.params.courseSlug.toString();

  Course.findOne({ courseSlug: adjustCourseSlug })
    .then(poolData => {
      let courseId = poolData._id.toString();
      const MatchCourse = mongoose.model(courseId, ContentSchema, courseId);

      MatchCourse.find()
        .then(courseData => {
          console.log(courseData[0].courseReview);
          res
            .status(200)
            .json({ courseData, courseName: poolData.courseName, courseId });
        })
        .catch(err => {console.log(err); return res.status(400).json(err) });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err);
    });
});

module.exports = router;
