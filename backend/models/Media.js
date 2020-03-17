const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MediaSchema = new Schema({
 _Id: Schema.Types.ObjectId,
 mediaId:  {
    type: String
  },
  mediaType: {
    type: String
  },
  mediaName: {
    type: String
  },
  mediaPreview: {
    type: String
  },
  mediaContent: {
    type: Object
  },

  mediaUpdate: {
    type: Date,
    default: Date.now
  },
  mediaTagEnglish:{
    type: Array
  },
  mediaTagThai:{
    type: Array
  },
});

module.exports = MediaSchema; 
