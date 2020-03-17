const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubjectSchema = new Schema({
  _Id: Schema.Types.ObjectId,

  english:  {
    type: String
  },
  thai: {
    type: String
  },
  category: {
    type: Array
  },


});

module.exports = SubjectSchema