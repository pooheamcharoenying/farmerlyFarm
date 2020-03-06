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
    type: String
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
  }
});

module.exports = CourseSchema