const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  uid: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  shoppingCart: [
    {
      productName: {
        type: String
      },
      productQuantity: {
        type: String
      },
    }
  ],
  orderHistory: [
    {
      courseId: {
        type: String
      }
    }
  ],
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
