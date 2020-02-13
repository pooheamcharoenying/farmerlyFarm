const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');
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
  Course.find().then(data => {
    res.status(200).json(data);
  }).catch((err)=>console.log(err));
});



///ADD Course
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

  const adjustCourseName = req.body.courseName.replace(/\s/g, '-');
  const adjustCourseNameStr = adjustCourseName.toString();
    const newCourse = new Course({
      courseName: adjustCourseNameStr,
      courseDescription: req.body.courseDescription,
      courseTeacher: req.body.courseTeacher,
      courseLevel: req.body.courseLevel ,
      courseSubject: req.body.courseSubject,
      courseImage: req.body.courseImage,
      courseTags: req.body.courseTags,
      courseActive: false,
      coursePublish:false
    });
  
    newCourse.save().then(newcourse => {
  

      User.findById( req.user.id ).then(user => {
     
        user.TeacherCourse.unshift({ courseName: adjustCourseNameStr });

        ///Create Course Content
        const MatchContent = mongoose.model(adjustCourseNameStr, ContentSchema,adjustCourseNameStr);
        const newContent = new MatchContent({ name:"plot",contentStructure: []});
  
        newContent.save()
       


        //Create Course Media
        const adjustMediaName = adjustCourseNameStr + "Media"
        const adjustMediaNameStr = adjustMediaName.toString()
        const MatchMedia = mongoose.model(adjustMediaNameStr, MediaSchema,adjustMediaNameStr);
        const newMedia = new MatchMedia({});

        newMedia.save()
        ///Main Resoponse
        user.save().then(newuser => res.status(200).json({"newUser":newuser,"newCourse":newcourse})).catch((err)=>console.log(err));


      }
    
  )
    
    }) 
  }
);


//Del
router.post(
  '/delete/:coursename',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

    const adjustCourseName = req.params.coursename.replace(/\s/g, '-')
    const adjustCourseNameStr = adjustCourseName.toString()
    const adjustMediaName = adjustCourseNameStr + "Media"
    const adjustMediaNameStr = adjustMediaName.toString()
  

    Course.deleteOne({ courseName: adjustCourseNameStr }, function (err) {
       
          res.status(200).json("success")
          if (err) return handleError(err);

          mongoose.connection.db.dropCollection(adjustCourseNameStr)
          mongoose.connection.db.dropCollection(adjustMediaNameStr)
        });
  }
)

//Get By Cat
router.get("/category/:category", async (req, res) => {
  Course.find({ courseSubject: req.params.category}).then(data => {
    res.status(200).json(data);
  }).catch((err)=>console.log(err));
 // res.json({ msg: req.params.cat })
});


//Search All

router.get("/search/:keyword", async (req, res) => {
  if(req.params.keyword){
    Course.find({ "courseName": { "$regex": req.params.keyword, "$options": "i" } }).then(data => {
    res.status(200).json(data);
  }).catch((err)=>console.log(err));
}
});


//Update Course Info
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {


    const adjustCourseName = req.body.courseName.replace(/\s/g, '-')
    const adjustCourseNameStr = adjustCourseName.toString()
   
    Course.findOneAndUpdate({ "courseName": adjustCourseNameStr }, {
      courseName: adjustCourseNameStr,
      courseDescription: req.body.courseDescription,
      courseTeacher: req.body.courseTeacher,
      courseLevel: req.body.courseLevel ,
      courseSubject: req.body.courseSubject,
      courseImage: req.body.courseImage,
      courseTags: req.body.courseTags,
    }, {new: true},  (err, doc) =>{
        res.status(200).json("success")
      if (err) {
        console.log("Something wrong when updating data!");
    }
    }).then((data)=>res.status(200).json("success")).catch((err)=>console.log(err))


  }
  
)

//Update ActiveStatus
router.post(
  '/status',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

console.log(req.body)
    const adjustCourseName = req.body.courseName.replace(/\s/g, '-')
    const adjustCourseNameStr = adjustCourseName.toString()
   
    Course.findOneAndUpdate({ "courseName": adjustCourseNameStr }, {
      courseActive: req.body.courseActive
    }, {new: true},  (err, doc) =>{
        res.status(200).json("success")
      if (err) {
        console.log("Something wrong when updating data!");
    }
    
    }).then((data)=>res.status(200).json("success")).catch((err)=>console.log(err))


  }
  
)


//Update publishStatus
router.post(
  '/publish',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

console.log(req.body)
    const adjustCourseName = req.body.courseName.replace(/\s/g, '-')
    const adjustCourseNameStr = adjustCourseName.toString()
   
    Course.findOneAndUpdate({ "courseName": adjustCourseNameStr }, {
      coursePublish: req.body.coursePublish
    }, {new: true},  (err, doc) =>{
        res.status(200).json("success")
      if (err) {
        console.log("Something wrong when updating data!");
    }
    }).then((data)=>res.status(200).json("success")).catch((err)=>console.log(err))


  }
  
)

//Update courseSubscriptor
router.post(
  '/subscriptor',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

    const adjustCourseName = req.body.courseName.replace(/\s/g, '-')
    const adjustCourseNameStr = adjustCourseName.toString()
   
    User.findById( req.user.id ).then(user => {
    Course.find({ "courseName": { "$regex": adjustCourseNameStr, "$options": "i" } }).then(data => {
      Course.courseSubscriptor.unshift({ userId: user._id });
      Course.save().then(data =>  res.status(200).json("sucess"));
     
    }).catch((err)=>console.log(err))
    

  })

}
    
  
)


//Add Structure
router.post(
  '/:coursename',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {
    const MatchContent = mongoose.model(req.params.coursename, ContentSchema,req.params.coursename);
    //const newContent = new MatchContent({ contentStructure: req.body.courseStructure});
    MatchContent.findOneAndUpdate({ name: 'plot' }, { 
      contentStructure: req.body.courseStructure,
      CourseInfoOverview: req.body.CourseInfoOverview,
        CourseInfoStudent: req.body.CourseInfoStudent,
        CourseInfoTeacher: req.body.CourseInfoTeacher, 
    
    }, {new: true},  (err, doc) =>{

      if (err) {
        console.log("Something wrong when updating data!");
    }
    }).then((data)=>res.status(200).json("success")).catch((err)=>console.log(err))

    //newContent.save().then(data => res.status(200).json(data))
  }
)

//Get Content Struc
router.get("/:coursename", async (req, res) => {
  const MatchCourse = mongoose.model(req.params.coursename, ContentSchema,req.params.coursename);
  const token = req.query.token;
  console.log(token);
  MatchCourse.find().then(data => {
    res.status(200).json(data);
  }).catch((err)=>console.log(err));
});

module.exports = router;
