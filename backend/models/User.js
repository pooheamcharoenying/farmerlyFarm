const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  uid: {
    type: String
  },
  schoolAdminId: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  pmid: {
    type: String
  },
  rpid: {
    type: String
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
            type: Object
          },
          logTime: {
            type: String
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
  schoolCourse: [
    {
      schoolId: {
        type: String
      },
      schoolApproved: {
        type: Boolean
      },
      SchoolCourseList: [
        {
          courseId: {
            type: String
          }
        }
      ],

    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  teacherPayment_AccountHolderName: {
    type: String
  },
  teacherPayment_AccountNumber: {
    type: String
  },
  teacherPayment_AccountBank: {
    type: String
  }
});

module.exports = UserSchema;
