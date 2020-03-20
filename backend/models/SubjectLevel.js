const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SubjectLevelSchema = new Schema({
  _Id: Schema.Types.ObjectId,

  LevelsThai:  {
    type: Array
  },
  LevelsEnglish: {
    type: Array
  },

});

module.exports = SubjectLevelSchema