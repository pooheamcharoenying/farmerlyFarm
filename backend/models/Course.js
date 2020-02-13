const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  courseId: Schema.Types.ObjectId,
  courseName: {
    type: String,
    required: true
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
  courseTags: {
    type: String
  },
  courseActive: {
    type: Boolean
  },
  coursePublish:{
    type:Boolean
  },
  courseUpdate: {
    type: Date,
    default: Date.now()
  },
  courseSubscriptor :{
    type: Object
  }
});

module.exports = CourseSchema