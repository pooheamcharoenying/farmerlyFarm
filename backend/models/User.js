const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  uid:{
    type:String
  },
  role:{
    type:String,
    default:"user"
  },
  courseSubscription: [
    {
      courseId: {
        type: String
      },
      courseLog: [
        {
          lessionId: {
            type: String
          },
          lessionData: {
            type: String
          }
        }
      ],

      quizLog: [
        {
          lessionId: {
            type: String
          },
          quizData: {
            type:Object
          },
          logTime:{
           type:String
          }
        }
      ]
    }
  ],
  teacherCourse: [
    {
      courseId: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserSchema;
