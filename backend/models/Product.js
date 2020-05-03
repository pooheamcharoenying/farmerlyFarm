const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  productSlug: {
    type: String,
  },
  productName: {
    type: String,
  },
  productDescription: {
    type: String
  },
  productSubType: {
    type: String
  },
  productPrice: {
    type: String
  },
  productImageURI: {
    type: String
  },
});

module.exports = CourseSchema