import React from "react";
import axios from "axios";
import { message } from 'antd';
function getCoursePoolAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true)
  axios
    .get("/api/course")
    .then(res => {
      GlobalHook.setGlobalCoursePool(res.data);
      GlobalHook.setGlobalLoading(false)
      console.log(res.data)
    })
    .catch(err => console.log(err));

}

function courseSearchKeywordAction(GlobalHook, key) {

  GlobalHook.setGlobalShowSearch(true)
  GlobalHook.setGlobalLoading(true)

  axios
    .get(`/api/course/search/${key}`)
    .then(res => {

      GlobalHook.setGlobalCourseSearch(res.data)
      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => console.log(err));


}

function courseSearchCatAction(GlobalHook, key) {
  GlobalHook.setGlobalShowSearch(true)
  GlobalHook.setGlobalLoading(true)

  axios
    .get(`/api/course/category/${key}`)
    .then(res => {
      GlobalHook.setGlobalCourseSearch(res.data)
      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => console.log(err));

}

function getCourseContentAction(GlobalHook, courseName) {
  GlobalHook.setGlobalLoading(true)
  axios
    .get(`/api/course/${courseName}`)
    .then(res => {
      GlobalHook.setGlobalCourseContent(res.data);

      GlobalHook.setGlobalCourseStructure(res.data[0].contentStructure);

      GlobalHook.setGlobalCourseInfoOverview(res.data[0].CourseInfoOverview)
      GlobalHook.setGlobalCourseInfoStudent(res.data[0].CourseInfoStudent)
      GlobalHook.setGlobalCourseInfoTeacher(res.data[0].CourseInfoTeacher)


      GlobalHook.setGlobalLoading(false)

      localStorage.setItem("InitStructure", JSON.stringify((res.data[0].contentStructure)))
      console.log(res.data)


    })
    .catch(err => console.log(err));

}



function CreateCourseAction(GlobalHook, setModalOpenStatus) {
  setModalOpenStatus(false)
  GlobalHook.setGlobalLoading(true)

  const pushData = {
    courseName: GlobalHook.getGlobalCourseName,
    courseTeacher: GlobalHook.getGlobalCourseTeacher,
    courseLevel: GlobalHook.getGlobalCourseLevel,
    courseImage: GlobalHook.getGlobalCourseImage,
    courseSubject: GlobalHook.getGlobalCourseSubject,
    courseTags: GlobalHook.getGlobalCourseTags,
    courseDescription: GlobalHook.getGlobalCourseDescription
  }

  axios
    .post("/api/course", pushData)
    .then(res => {

      GlobalHook.setGlobalUser(res.data.newUser);

      localStorage.setItem("globalUser", JSON.stringify(res.data.newUser));
      message.success('สร้างคอร์สสำเร็จ');
      GlobalHook.setGlobalLoading(false)


      const adjustCourseName = GlobalHook.getGlobalCourseName.replace(/\s/g, '-');
      const adjustCourseNameStr = adjustCourseName.toString();
      window.location.href = `/teacher/${adjustCourseNameStr}`
    })
    .catch(err => {
      console.log(err);
    });
}


function GetMediaFreeAction(GlobalHook, mediaId) {
  GlobalHook.setGlobalLoading(true)

  const pushData = {
    courseName: GlobalHook.getGlobalCourseName,
    mediaId: mediaId
  }

  axios
    .post("/api/coursemedia/free", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false)


      if (res.data.data.mediaType == "Video") {
        GlobalHook.setGlobalMediaVideo(res.data.data.mediaContent)
      } else if (res.data.data.mediaType == "Document") {
        GlobalHook.setGlobalMediaDocument(res.data.data.mediaContent)

      } else if (res.data.data.mediaType == "Quiz") {
        GlobalHook.setGlobalMediaQuiz(res.data.data.mediaContent)

      }

    })
    .catch(err => {
      console.log(err);
    });
}


function UpdataCourseStatusAction(GlobalHook, courseName, courseStatus) {
  GlobalHook.setGlobalLoading(true)


  const pushData = {
    courseName: courseName,
    courseActive: courseStatus
  }

  axios
    .post("/api/course/status", pushData)
    .then(res => {

      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => {
      console.log(err);
    });
}

function UpdataCoursepublishAction(GlobalHook, courseName, coursePublish) {
  GlobalHook.setGlobalLoading(true)


  const pushData = {
    courseName: courseName,
    coursePublish:coursePublish
  }

  axios
    .post("/api/course/publish", pushData)
    .then(res => {

      GlobalHook.setGlobalLoading(false)

    })
    .catch(err => {
      console.log(err);
    });
}




function DeleteCourseLessionAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true)



}


export { getCoursePoolAction, courseSearchKeywordAction, courseSearchCatAction, getCourseContentAction, CreateCourseAction, GetMediaFreeAction, UpdataCourseStatusAction, DeleteCourseLessionAction, UpdataCoursepublishAction };
