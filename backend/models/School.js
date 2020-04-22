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
  schoolImage: {
    type: String
  },
  schoolUsedQuota: {
    type: Number,
    defualt:0
  },
  schoolMaxQuota: {
    type: Number,
    default:0
  },
  schoolAdminEmail: {
    type: String
  },
});

module.exports = SchoolSchema;
