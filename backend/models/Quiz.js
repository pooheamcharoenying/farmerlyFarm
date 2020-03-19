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
  courseSlug:{
    type: String
  },
  courseId:{
    type: String
  },
  sectionName:{
    type:String
  },
  lessionName:{
    type:String
  },
  teacherId:{
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
  quizTagEnglish:{
    type: Array
  },
  quizTagThai:{
    type: Array
  },
  quizTagStatus:{
    type: Boolean,
    default:true
  },
});

module.exports = QuizSchema; 
