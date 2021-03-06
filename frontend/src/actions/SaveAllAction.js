import React from "react";
import axios from "axios";
import { message } from "antd";
import {AddNewQuestionAction} from './QuizAction'
function SaveAllAction(GlobalHook) {
  console.log('savingallaction')
  GlobalHook.setMutantStatus(false)
   SaveCourseStructure(GlobalHook)
}




function SaveCourseStructure(GlobalHook){

  GlobalHook.setGlobalLoading(true);

  const pushData = {
    CourseInfoOverview: GlobalHook.getGlobalCourseInfoOverviewNew,
    CourseInfoStudent: GlobalHook.getGlobalCourseInfoStudentNew,
    CourseInfoTeacher: GlobalHook.getGlobalCourseInfoTeacherNew,
    courseStructure: GlobalHook.getGlobalCourseStructureNew,
    courseSlug:GlobalHook.getGlobalCourseSlug
  };
  console.log(pushData)
  GlobalHook.setGlobalCourseInfoOverview(GlobalHook.getGlobalCourseInfoOverviewNew)
  GlobalHook.setGlobalCourseInfoStudent(GlobalHook.getGlobalCourseInfoStudentNew)
  GlobalHook.setGlobalCourseInfoTeacher(GlobalHook.getGlobalCourseInfoTeacherNew)

  return axios
    .post(`/api/course/structureUpdate`, pushData)
    .then(res => {
      SaveMediaContent(GlobalHook)
      localStorage.setItem("InitStructure", JSON.stringify((GlobalHook.getGlobalCourseStructureNew)))
      return "save all data success"
    })
    .catch(err => {
      console.log(err);
      message.error("Saving Error")
    });
}



function SaveMediaContent (GlobalHook){

  console.log('foofighters')
  console.log(GlobalHook.getLessionTagSameAsCourseStatus)
  console.log(GlobalHook.getQuizTagSameAsLessionStatus)

  var mediaTagThai = [];
  var mediaTagEnglish = [];
  if (GlobalHook.getLessionTagSameAsCourseStatus) {
    mediaTagEnglish = GlobalHook.getGlobalCourseTagEnglish;
    mediaTagThai = GlobalHook.getGlobalCourseTagThai;
  } else {
    mediaTagEnglish = GlobalHook.getGlobalCourseTagEnglishLession;
    mediaTagThai = GlobalHook.getGlobalCourseTagThaiLession;   
  }


 
  const {mediaId,mediaType,mediaName,mediaPreview} = GlobalHook.getGlobalLessionSelect
 
  const pushMediadata = {
      "courseName":GlobalHook.getGlobalCourseName,
      "mediaId": mediaId,
      "mediaName":mediaName,
      "mediaType":mediaType,

      "mediaPreview":mediaPreview,

      "mediaContent":GlobalHook.getGlobalMediaNew,
      "courseSlug":GlobalHook.getGlobalCourseSlug,
      "mediaTagEnglish":mediaTagEnglish,
      "mediaTagThai":mediaTagThai,
      "mediaTagStatus":GlobalHook.getLessionTagSameAsCourseStatus
  }


axios
  .post('/api/coursemedia/', pushMediadata)
  .then(res => {
    AddNewQuestionAction(GlobalHook)
 
  })
  .catch(err => {
    console.log(err);
    message.error("Saving Error")

  });
}


function SaveCourseStructureOnly(GlobalHook){
  console.log("hello saving course structure only")
  GlobalHook.setMutantStatus(false)
  // GlobalHook.setGlobalLoading(true);

  const pushData = {
    CourseInfoOverview: GlobalHook.getGlobalCourseInfoOverviewNew,
    CourseInfoStudent: GlobalHook.getGlobalCourseInfoStudentNew,
    CourseInfoTeacher: GlobalHook.getGlobalCourseInfoTeacherNew,
    courseStructure: GlobalHook.getGlobalCourseStructureNew,
    courseSlug:GlobalHook.getGlobalCourseSlug
  };
  console.log(pushData)
  GlobalHook.setGlobalCourseInfoOverview(GlobalHook.getGlobalCourseInfoOverviewNew)
  GlobalHook.setGlobalCourseInfoStudent(GlobalHook.getGlobalCourseInfoStudentNew)
  GlobalHook.setGlobalCourseInfoTeacher(GlobalHook.getGlobalCourseInfoTeacherNew)

  axios
    .post(`/api/course/structureUpdate`, pushData)
    .then(res => {
      localStorage.setItem("InitStructure", JSON.stringify((GlobalHook.getGlobalCourseStructureNew)))

    })
    .catch(err => {
      console.log(err);
      message.error("Saving Error")
    });
}


export { SaveAllAction, SaveCourseStructureOnly };
