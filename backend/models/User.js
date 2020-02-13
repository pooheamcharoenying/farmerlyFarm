const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userId: Schema.Types.ObjectId,
  uid:{
    type:String
  },
  name: {
    type: String
  },
  email: {
    type: String,
  
  },
  password: {
    type: String,

  },
  avatar: {
    type: String
  },
  role:{
    type:String,
    default:"user"
  },
  courseSubscription: [
    {
      courseName: {
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
  TeacherCourse: [
    {
      courseName: {
        type: String
      },
      courseActive: {
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
