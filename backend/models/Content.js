const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContentSchema = new Schema({
 name:{
  type:String
 },
  contentStructure: {
    type: Array
  },
  CourseInfoOverview:{
    type:String
   },
   CourseInfoStudent:{
    type:String
   },
   CourseInfoTeacher:{
    type:String
   }
});

module.exports = ContentSchema; 
