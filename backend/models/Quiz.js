const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuizSchema = new Schema({
 _Id: Schema.Types.ObjectId,
 questionId:  {
    type: String
  },
  questionName: {
    type: String
  },
  questionField: {
    type: Object
  },
  answerType: {
    type: String
  },
  answerField: {
    type: Object
  },
  answerCorrect: {
    type: Object
  },
  
  quizUpdate: {
    type: Date,
    default: Date.now
  },
  courseName:{
    type: String
  },
  sectionName:{
    type:String
  },
  lessionName:{
    type:String
  },
  TeacherId:{
    type:String
  },
  mediaId:{
    type:String
  },
  answerExplainType: {
    type: String
  },
  answerExplainField: {
    type: Object
  },
});

module.exports = QuizSchema; 
