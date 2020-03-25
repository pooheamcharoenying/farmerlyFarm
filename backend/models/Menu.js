const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubjectMenuSchema = new Schema({
  _Id: Schema.Types.ObjectId,

  thai:  {
    type: Array
  },
  english: {
    type: Array
  },

});

module.exports = SubjectMenuSchema