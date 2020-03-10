const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");


const UserSchema = require("../../models/User");
const User = mongoose.model("user", UserSchema);

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.post("/getToken", (req, res) => {

  const uid = req.body.uid
  const payload = { id: uid }
  User.findOne({ uid }).then(user => {
console.log(user)
    if (user) {
      jwt.sign(
        { id: user._id },
        process.env.SECRETKEY,
        { expiresIn: (7*24*60*60) },
        (err, token) => {
          res.status(200).json({
            token: "Bearer " + token,
            user
          });
        }
      );
    }else{

      const newUser = new User({
        uid:uid,
       
      })

      newUser.save().then(user => {
       
      jwt.sign(
        { id: user._id },
        process.env.SECRETKEY,
        { expiresIn: (7*24*60*60) },
        (err, token) => {
          res.status(200).json({
            token: "Bearer " + token,
            user
          });
        }
      );
      }).catch((err)=>res.status(400).json(err))


    }

  }).catch((err)=>res.status(400).json(err))


})

router.post("/register", (req, res) => {
  const uid = req.body.uid
  console.log("regis")
  console.log(uid)

  User.findOne({ uid }).then(user => {

    if (user) {
      console.log("user")
    }else{
      const newUser = new User({
        uid:uid,
       
      })

      newUser.save().then(user => {
        res.status(200).json(user)
        console.log(user)
      
      })
      .catch((err)=>{
        console.log(err)
        res.status(400).json(err)
      })


    }



  }).catch((err)=>res.status(404).json(err))
  // const { errors, isValid } = validateRegisterInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }


  // User.findOne({ uid }).then(user => {
  //   if (user) {
  //     errors.email = "User already exists";
  //     return res.status(400).json(errors);
  //   } else {
  //     // const avatar = gravatar.url(req.body.email, {
  //     //   s: "200",
  //     //   r: "pg", 
  //     //   d: "mm" 
  //     // });

      // const newUser = new User({
      //   uid:uid,
      //   avatar:'https://i.ya-webdesign.com/images/profile-avatar-png-9.png'
      //   // name: req.body.name,
      //   // email: req.body.email,
      //   // avatar:avatar,
      //   // password: ""

      // }).then(user => {
      //   res.json(user)})
      // .catch(err => console.log(err));

  //     // bcrypt.genSalt(11, (err, salt) => {
  //     //   bcrypt.hash(req.body.password, salt, (err, hash) => {
  //     //     if (err) throw err;
  //     //     newUser.password = hash;
  //     //     newUser
  //     //       .save()
            // .then(user => res.json(user))
            // .catch(err => console.log(err));
  //     //   });
  //     // });
  //   }
  // }).catch((err)=>{
  //   res.status(404).json(errors);
  //    console.log(err)
  //   });
});


router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // const email = req.body.email;
  // const password = req.body.password;

  const uid = req.body.uid

  console.log(uid)

  // Find user by email
  User.findOne({ uid }).then(user => {
       const payload = { id: uid }; // Create JWT Payload
          if (!user) {
      errors = "User not found";
      return res.status(404).json(errors);
    }

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: (7*24*60*60) },
      (err, token) => {
        res.status(200).json({
          token: "Bearer " + token,
          user
        });
      }
    );

    // Check for user
    // if (!user) {
    //   errors.email = "User not found";
    //   return res.status(404).json(errors);
    // }

    // Check Password
  //   bcrypt.compare(password, user.password).then(isMatch => {
  //     if (isMatch) {
  //       // User Matched
  //       const payload = { id: user.id }; // Create JWT Payload
  //        user.password = "";
  //       // Sign Token
  //       jwt.sign(
  //         payload,
  //         process.env.SECRETKEY,
  //         { expiresIn: (7*24*60*60) },
  //         (err, token) => {
  //           res.json({
  //             token: "Bearer " + token,
  //             user
  //           });
  //         }
  //       );
  //     } else {
  //       errors.password = "Password incorrect";
  //       return res.status(400).json(errors);
  //     }
  //   });
   }).catch((err)=>{
    res.status(404).json(errors);
     console.log(err)
    })
});


router.post(
  "/subscription",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    User.findById(req.user.id).then(user => {
      user.courseSubscription.unshift({ courseId: req.body.courseId });

      user.save().then(user => res.json(user));
    }).catch((err)=>console.log(err))
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

          // console.log(isLessIdExist)

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
      .catch(err => {console.log(err);res.status(400).json(err)});
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
          // const findMatchLession =  user.courseSubscription[findCourseMatch].quizLog.filter((data)=>((data.lessionId==req.body.lessionId)&&(data.logTime==req.body.logTime)))

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
          //    const findMatchQuestion = findMatchLesion.quizData.map((data)=>data.QID).indexOf(req.body.QID);

          //   // res.json(findMatchQuestion)

          //  if(findMatchQuestion == -1){
          //   user.courseSubscription[findCourseMatch].quizLog[isLessIdExist].quizData.unshift({ QID:req.body.QID,userAns: req.body.userAns});
          //    res.json(user.courseSubscription[findCourseMatch].quizLog[isLessIdExist].quizData)

          //     }else{

          //    }
          console.log("777");
          console.log(req.body.QID);
          //res.json(findMatchLession)
          user.save().then(user => res.json(user));
        }
      })
      .catch(err => console.log(err));
  }
);


module.exports = router;
