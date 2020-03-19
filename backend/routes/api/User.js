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
      .catch(err => console.log(err));
  }
);

//Log
router.post(
  "/log",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
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

          if (isLessIdExist == -1) {
            user.courseSubscription[findCourseMatch].courseLog.unshift({
              lessionId: req.body.lessionId
            });
          } else {
            //user.courseSubscription[findCourseMatch].courseLog[isLessIdExist].lessionId =  req.body.lessionId
          }
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
    User.findById(req.user.id)
      .then(user => {
        const findCourseMatch = user.courseSubscription
          .map(data => data.courseId)
          .indexOf(req.body.courseId);
        if (user.courseSubscription[findCourseMatch] != undefined) {
          user.courseSubscription[findCourseMatch].quizLog.unshift({
            lessionId: req.body.lessionId,
            quizData: req.body.quizData,
            logTime: Date.now()
          });

          user.save().then(user => res.json(user));
        }
      })
      .catch(err => console.log(err));
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
      .catch(err => console.log(err));
  }
);

router.post(
  "/getuserbyid",

  (req, res) => {
    User.findById(req.body.ouid).then(user => {
      console.log(user);
      admin
        .auth()
        .getUser(user.uid)
        .then(function(userRecord) {
          res.status(200).json(userRecord.toJSON());
        })
        .catch(function(error) {
          console.log("Error fetching user data:", error);
          res.status(400).json(error);
        });
    });
  }
);



module.exports = router;
