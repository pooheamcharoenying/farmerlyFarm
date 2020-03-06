const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContentSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  name:{
    type:String
   },
  contentStructure: {
    type: Array
  },
  CourseInfoOverview:{
    type:String
   },
   CourseInfoStudent:{
    type:String
   },
   CourseInfoTeacher:{
    type:String
   },
  courseReview:{
    type: Array
  }
});

module.exports = ContentSchema; 
