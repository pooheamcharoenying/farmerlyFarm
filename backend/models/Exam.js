const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExamSchema = new Schema({
  examId: Schema.Types.ObjectId,
  examCategory: {
    type: String
  },
  examContent: {
    type: String
  },
  examAnswer: {
    type: String
  },
  examUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = MediaSchema; 
