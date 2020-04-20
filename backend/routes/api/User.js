const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const admin = require("firebase-admin");

const UserSchema = require("../../models/User");

var serviceAccount = require("../../studysabaiapp-firebase-adminsdk-uqhjc-63ba1c8102.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://studysabaiapp.firebaseio.com"
});
const User = mongoose.model("user", UserSchema);

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/getToken", (req, res) => {
  const uid = req.body.uid;
  const payload = { id: uid };
  User.findOne({ uid })
    .then(user => {
      if (user) {
        jwt.sign(
          { id: user._id },
          process.env.SECRETKEY,
          { expiresIn: 7 * 24 * 60 * 60 },
          (err, token) => {
            res.status(200).json({
              token: "Bearer " + token,
              user
            });
          }
        );
      } else {
        const newUser = new User({
          uid: uid
        });

        newUser
          .save()
          .then(user => {
            jwt.sign(
              { id: user._id },
              process.env.SECRETKEY,
              { expiresIn: 7 * 24 * 60 * 60 },
              (err, token) => {
                res.status(200).json({
                  token: "Bearer " + token,
                  user
                });
              }
            );
          })
          .catch(err => res.status(400).json(err));
      }
    })
    .catch(err => res.status(400).json(err));
});

router.post("/deleteTeacherCourseDataDb", async (req, res) => {
  console.log('saymooo tono')
  console.log(req.body.courseId)
  User.find({ courseSubscription: { $elemMatch: { courseId: req.body.courseId } } })
    .then(data => {

      var matchFound = 0;

      for (item of data) {
        matchFound = 0;
        for (index in item.courseSubscription) {
          if (item.courseSubscription[index].courseId == req.body.courseId) {
            // console.log('match found')
            matchFound = 1;
            item.courseSubscription.splice(index,1)
            break;
          }
        }

        item.save(function (err) {
          if (err) {
            console.error('ERROR!');
          } else {
            console.log('save user success')
          }
        });
  
      }

      // find teacher to erase log
      User.findOne({ teacherCourse: { $elemMatch: { courseId: req.body.courseId } } })
        .then( data => {

          console.log('whats up doc')
          console.log(data)
          for (index in data.teacherCourse) {
            if (data.teacherCourse[index].courseId == req.body.courseId) {
              // console.log('match found')
              matchFound = 1;
              data.teacherCourse.splice(index,1)
              break;
            }
          }

          console.log('whats up jude')
          console.log(data)
  
          data.save(function (err) {
            if (err) {
              console.error('ERROR!');
            } else {
              console.log('save user success')
            }
          });
          res.status(200).json(data);

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
});

router.post("/register", (req, res) => {
  const uid = req.body.uid;

  User.findOne({ uid })
    .then(user => {
      if (user) {
      } else {
        const newUser = new User({
          uid: uid
        });

        newUser
          .save()
          .then(user => {
            res.status(200).json(user);
            console.log(user);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    })
    .catch(err => res.status(404).json(err));
});

router.post("/login", (req, res) => {
  const uid = req.body.uid;

  // Find user by email
  User.findOne({ uid })
    .then(user => {
      const payload = { id: uid }; // Create JWT Payload
      if (!user) {
        errors = "User not found";
        return res.status(404).json(errors);
      }

      jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: 7 * 24 * 60 * 60 },
        (err, token) => {
          res.status(200).json({
            token: "Bearer " + token,
            user
          });
        }
      );
    })
    .catch(err => {
      res.status(404).json(errors);
      console.log(err);
    });
});

router.post(
  "/subscription",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        user.courseSubscription.unshift({ courseId: req.body.courseId });

        user.save().then(user => res.json(user));
      })
      .catch(err => { console.log(err); res.status(400).json(err) });
  }
);

//Log
router.post(
  "/log",
  passport.authenticate("jwt", { session: false }),


  (req, res) => {
    console.log('lumberjack logger')
    User.findById(req.user.id)
      .then(user => {
        const findCourseMatch = user.courseSubscription
          .map(data => data.courseId)
          .indexOf(req.body.courseId);
        if (user.courseSubscription[findCourseMatch] != undefined) {
          const isLessIdExist = user.courseSubscription[
            findCourseMatch
          ].courseLog
            .map(data => data.lessionId)
            .indexOf(req.body.lessionId);

          // if (isLessIdExist == -1) {
            user.courseSubscription[findCourseMatch].courseLog.unshift({
              lessionId: req.body.lessionId,
              startTime: req.body.startTime,
              endTime: req.body.endTime
            });
          // } else {
            //user.courseSubscription[findCourseMatch].courseLog[isLessIdExist].lessionId =  req.body.lessionId
          // }
          user.save().then(user => res.json(user));
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/////Log////
router.post(
  "/quizlog",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    console.log('hiho')
    console.log(req.body)

    User.findById(req.user.id)
      .then(user => {
        const findCourseMatch = user.courseSubscription
          .map(data => data.courseId)
          .indexOf(req.body.courseId);
        if (user.courseSubscription[findCourseMatch] != undefined) {
          user.courseSubscription[findCourseMatch].quizLog.unshift({
            lessionId: req.body.lessionId,
            quizData: req.body.quizData,
            // logTime: req.body.quizStartTime,
            endTime: Date.now(), //Date.now()
            startTime: req.body.quizStartTime,
            passResult: req.body.passResult,
          });
          console.log('user')
          console.log(user.courseSubscription)

          user.save().then(user => res.json(user));
        }
      })
      .catch(err => { console.log(err); res.status(400).json(err) });
  }
);

router.post(
  "/quizpool",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        const findCourseMatch = user.courseSubscription
          .map(data => data.courseName)
          .indexOf(req.body.courseName);
        if (user.courseSubscription[findCourseMatch] != undefined) {
          const isLessIdExist = user.courseSubscription[findCourseMatch].quizLog
            .map(data => data.logTime)
            .indexOf(req.body.logTime);

          const findMatchLesion =
            user.courseSubscription[findCourseMatch].quizLog[isLessIdExist];
          user.courseSubscription[findCourseMatch].quizLog[
            isLessIdExist
          ].quizData.unshift({
            QID: req.body.QID,
            userAns: req.body.userAns,
            userAnsStatus: req.body.userAnsStatus
          });

          user.save().then(user => res.json(user));
        }
      })
      .catch(err => { console.log(err); res.status(400).json(err) });
  }
);

router.post(
  "/getuserbyid",

  (req, res) => {
    User.findById(req.body._id).then(user => {
      console.log(user);
      admin
        .auth()
        .getUser(user.uid)
        .then(function (userRecord) {
          console.log('resulty')
          console.log(userRecord)

          res.status(200).json(userRecord.toJSON());
        })
        .catch(function (error) {
          console.log("Error fetching user data:", error);
          res.status(400).json(error);
        }); s
    });
  }
);





router.post(
  "/updatefirebaseuser",
  (req, res) => {
    console.log('updateFirebase')
    console.log(req.body)
    admin
    .auth()
    .updateUser(req.body.uid, { displayName: req.body.displayName } )
    .then(function (userRecord) {
      console.log('successfully update firebase user')
    })
    .catch(function (error) {
      console.log('Error updating user:', error);
    });
  }
);


router.post(
  "/getmanyusersbyid",

  (req, res) => {

    const mongooseIdList = []
    const userRecordArray = []
    for (item of req.body.listId) {
      mongooseIdList.push(mongoose.Types.ObjectId(item._id))
    }

    console.log('hope')
    console.log(mongooseIdList)

    User.find({
      '_id': {
        $in: mongooseIdList
      }
    }, function (err, docs) {
      if (err) {
        return res.status(400).json(err);
      }
      else {
        res.status(200).json(docs);
      }
    });
  }
);


async function getUserFromFirebase(inputId) {
  // console.log(inputId)
  // return "rodeo"

  return await admin
    .auth()
    .getUser(inputId)
    .then(function (userRecord) {
      console.log('komodo')
      console.log(userRecord)
      return userRecord
    })
    .catch(function (error) {
      console.log("Error fetching user data:", error);
      return error
    });
}

router.post(
  "/getmanyusersfromfirebase",

  (req, res) => {

    const userRecordArray = []
    let promises = [];

    for (item of req.body.listId) {
      // Add new promise
      promises.push(
        getUserFromFirebase(item.uid).then(function (check) {
          console.log('checker')
          console.log(check)
          userRecordArray.push(check)
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        console.log('All actions run without any issues!');
        console.log('promise result')
        console.log(userRecordArray)
        res.status(200).json(userRecordArray);

      }).catch((error) => {
        console.log('An error occured!');
        return res.status(400).json(err);
      });
  }
);





module.exports = router;
