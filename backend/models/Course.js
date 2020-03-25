const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  courseSlug: {
    type: String,
  },
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String
  },
  courseTeacher: {
    type: String
  },
  courseLevel: {
    type: String
  },
  courseSubject: {
    type: String
  },
  courseImage: {
    type: String
  },
  courseImageFileName: {
    type: String
  },
  courseTag: {
    type: Object
  },
  courseActive: {
    type: Boolean
  },
  coursePublish:{
    type:Boolean,
  },
  courseUpdate: {
    type: Date,
    default: Date.now()
  },
  courseSubscriptor :{
    type: Object
  },
  courseOwnerId: {
    type: String
  },
  courseFee: {
    type: String
  },
  coursePrice: {
    type: String
  },
  courseTagEnglish: {
    type: Array
  },
  courseTagThai: {
    type: Array
  },
  courseVimeoId: {
    type: String
  },
  courseSchool:{
    type:Boolean
  },
  coursePublic:{
    type:Boolean
  }
});

module.exports = CourseSchema