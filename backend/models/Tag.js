const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  english: {
    type: String
  },
  thai: {
    type: String
  },
  subject: {
    type: String
  }
});

module.exports = TagSchema;
