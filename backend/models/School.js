const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  schoolName: {
    type: String
  },
  schoolSlug: {
    type: String
  },
  schoolRemainingStudentQuota: {
    type: Number
  }
});

module.exports = SchoolSchema;
