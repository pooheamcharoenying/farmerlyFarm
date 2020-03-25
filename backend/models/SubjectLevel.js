const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubjectLevelSchema = new Schema({
  _Id: Schema.Types.ObjectId,

  menu: {
    type: Array ,
    menuThai: {
      type: String
    },
    menuEnglish: {
      type: String
    },
  },

});

module.exports = SubjectLevelSchema