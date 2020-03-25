import React from "react";
import axios from "axios";
import { message } from "antd";
function getCoursePoolAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true);
  axios
    .get("/api/course")
    .then(res => {
      GlobalHook.setGlobalCoursePool(res.data);
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}

function getSubjectCategories() {
  return axios
    .get("/api/course/subjects")
    .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      console.log('pooh subject')
      console.log(response.data)
      return response.data
  })
}

function getSubjectLevels() {
  console.log('getting subject levels')
  return axios
    .get("/api/course/subjectLevels")
    .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      return response.data
  })
}

function getSubjectMenu() {
  console.log('getting subject levels')
  return axios
    .get("/api/course/subjectMenu")
    .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      return response.data
  })
}

function CreateVimeoFolder(courseName, courseTeacher, inputCourseName) {
  console.log('creating new vimeo folder')  
  console.log(courseName)
  console.log(courseTeacher)
  var tempString = courseName + " " + courseTeacher
  console.log('cozmoanki')
  console.log(tempString)
  axios.post('/api/course/createVimeoFolder', {
    folderName: tempString,
    courseName: inputCourseName
  })
  .then( response => {
    console.log('got a response')
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function MoveVimeoVideoToFolder(res,GlobalHook) {
  const newVideoCode = res.data.uri.replace("/videos/", "");
  console.log('moving video to a new folder')  
  console.log(newVideoCode)
  console.log(GlobalHook.getGlobalVimeoId)

  axios.post('/api/course/moveVideoFolder', {
    videoId: newVideoCode,
    videoFolderId: GlobalHook.getGlobalVimeoId
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function deleteQuestionsInQuiz(input) {
  axios.post('/api/course/deleteQuizQuestions', {
    mediaId: input
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log('call to delte questions in quiz')
}





function getCoursePoolAllAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true);
  axios
    .get("/api/course/all")
    .then(res => {
      GlobalHook.setGlobalCoursePool(res.data);
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}


function courseSearchKeywordAction(GlobalHook, key) {
  GlobalHook.setGlobalShowSearch(true);
  GlobalHook.setGlobalLoading(true);

  axios
    .get(`/api/course/search/${key}`)
    .then(res => {
      GlobalHook.setGlobalCourseSearch(res.data);
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}

function courseSearchCatAction(GlobalHook, key) {
  GlobalHook.setGlobalShowSearch(true);
  GlobalHook.setGlobalLoading(true);

  axios
    .get(`/api/course/category/${key}`)
    .then(res => {
      GlobalHook.setGlobalCourseSearch(res.data);
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}

function getCourseContentAction(GlobalHook, courseSlug) {
  GlobalHook.setGlobalLoading(true);
  axios
    .get(`/api/course/${courseSlug}`)
    .then(res => {

      GlobalHook.setGlobalCourseContent(res.data);

      GlobalHook.setGlobalCourseStructure(
        res.data.courseData[0].contentStructure
      );

      GlobalHook.setGlobalCourseInfoOverview(
        res.data.courseData[0].CourseInfoOverview
      );
      GlobalHook.setGlobalCourseInfoStudent(
        res.data.courseData[0].CourseInfoStudent
      );
      GlobalHook.setGlobalCourseInfoTeacher(
        res.data.courseData[0].CourseInfoTeacher
      );

      GlobalHook.setGlobalCourseReviewPool(
        res.data.courseData[0].courseReview
      );
      GlobalHook.setGlobalCourseName(res.data.courseName);

      GlobalHook.setGlobalcourseId(res.data.courseId)
      GlobalHook.setGlobalLoading(false);
      localStorage.setItem(
        "InitStructure",
        JSON.stringify(res.data.courseData[0].contentStructure)
      );

      console.log(res.data)
    })
    .catch(err => console.log(err));
}

function CreateCourseAction(GlobalHook, setModalOpenStatus) {

  console.log('creating new course --------------------------------------')



  setModalOpenStatus(false);
  GlobalHook.setGlobalLoading(true);
  const courseSlug = GlobalHook.getGlobalCourseName
    .replace(/\s/g, "-")
    .toString();
  const pushData = {
    courseName: GlobalHook.getGlobalCourseName,
    courseTeacher: GlobalHook.getGlobalCourseTeacher,
    courseLevel: GlobalHook.getGlobalCourseLevel,
    courseImage: GlobalHook.getGlobalCourseImage,
    courseSubject: GlobalHook.getGlobalCourseSubject,
    courseTag: GlobalHook.getGlobalCourseTag,
    courseDescription: GlobalHook.getGlobalCourseDescription,
    courseSlug: courseSlug,
    courseImageFileName:GlobalHook.getGlobalcourseImageFileName,
    coursePrice:GlobalHook.getGlobalCoursePrice,
    courseFee:GlobalHook.getGlobalCourseFee,
    courseTagThai:GlobalHook.getGlobalCourseTagThai,
    courseTagEnglish:GlobalHook.getGlobalCourseTagEnglish,
    courseTagSubject:GlobalHook.getGlobalCourseTagSubject,
    courseVimeoId: "defualt"
  };

  console.log('see creation data')
  console.log(pushData)

  axios
    .post("/api/course/create", pushData)
    .then(res => {
      GlobalHook.setGlobalUser(res.data.newUser);

      localStorage.setItem("globalUser", JSON.stringify(res.data.newUser));
      message.success("สร้างคอร์สสำเร็จ");
      GlobalHook.setGlobalLoading(false);

      console.log('check course slug')
      console.log(GlobalHook.getGlobalCourseName)
      CreateVimeoFolder(GlobalHook.getGlobalCourseName, GlobalHook.getGlobalCourseTeacher, GlobalHook.getGlobalCourseName)


      // window.location.href = `/teacher/${courseSlug}`;


    })
    .catch(err => {
      console.log(err);
    });
}

function GetMediaFreeAction(GlobalHook, mediaId) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseSlug: GlobalHook.getGlobalCourseSlug,
    mediaId: mediaId
  };


  axios
    .post("/api/coursemedia/free", pushData)
    .then(res => {

      GlobalHook.setGlobalLoading(false);

      if (res.data.data.mediaType == "Video") {
        GlobalHook.setGlobalMediaVideo(res.data.data.mediaContent);
      } else if (res.data.data.mediaType == "Document") {
        GlobalHook.setGlobalMediaDocument(res.data.data.mediaContent);
      } else if (res.data.data.mediaType == "Quiz") {
        GlobalHook.setGlobalMediaQuiz(res.data.data.mediaContent);
      }

      GlobalHook.setGlobalCourseTagEnglishLession(res.data.data.mediaTagEnglish)
      GlobalHook.setGlobalCourseTagThaiLession(res.data.data.mediaTagThai)
      GlobalHook.setLessionTagSameAsCourseStatus(res.data.data.mediaTagStatus)

    
    })
    .catch(err => {
      console.log(err);
    });
}

function GetCourseSettingAction(GlobalHook,courseSlug) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseSlug: courseSlug
  };

  axios
    .post("/api/course/getcoursesetting", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
  
      GlobalHook.setGlobalCourseSubject(res.data.courseSubject)
      GlobalHook.setGlobalCourseLevel(res.data.courseLevel)
      GlobalHook.setGlobalCourseTeacher(res.data.courseTeacher)
      GlobalHook.setGlobalCourseDescription(res.data.courseDescription)
      GlobalHook.setGlobalCourseImage(res.data.courseImage)
      GlobalHook.setGlobalCourseTag(res.data.courseTag)
      GlobalHook.setGlobalcourseImageFileName(res.data.courseImageFileName)
      GlobalHook.setGlobalCourseFee(res.data.courseFee)
      GlobalHook.setGlobalCoursePrice(res.data.coursePrice)
      GlobalHook.setGlobalCourseTagEnglish(res.data.courseTagEnglish)
      GlobalHook.setGlobalCourseTagThai(res.data.courseTagThai)
      GlobalHook.setGlobalVimeoId(res.data.courseVimeoId)

    })
    .catch(err => {
      console.log(err);
    });
}

function SaveCourseSetting(GlobalHook,courseSlug,setModalOpenStatus) {
  const NewCourseSlug = GlobalHook.getGlobalCourseName
    .replace(/\s/g, "-")
    .toString();
  GlobalHook.setGlobalLoading(true);

  const pushData = {
        courseSlug: courseSlug,
        NewCourseSlug:NewCourseSlug,
        courseName: GlobalHook.getGlobalCourseName,
        courseDescription: GlobalHook.getGlobalCourseDescription,
        courseTeacher: GlobalHook.getGlobalCourseTeacher,
        courseLevel: GlobalHook.getGlobalCourseLevel,
        courseSubject: GlobalHook.getGlobalCourseSubject,
        courseImage: GlobalHook.getGlobalCourseImage,
        courseTag: GlobalHook.getGlobalCourseTag,
        courseImageFileName:GlobalHook.getGlobalcourseImageFileName,
        coursePrice:GlobalHook.getGlobalCoursePrice,
        courseFee:GlobalHook.getGlobalCourseFee,
        courseTagThai:GlobalHook.getGlobalCourseTagThai,
        courseTagEnglish:GlobalHook.getGlobalCourseTagEnglish,
        courseVimeoId:GlobalHook.getGlobalVimeoId
  };


  axios
    .post("/api/course/update", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      setModalOpenStatus(false)

      console.log( GlobalHook.getGlobalCourseName + " " + GlobalHook.getGlobalCourseTeacher)
      axios.post('/api/course/editVimeoFolderName', {
        folderName: GlobalHook.getGlobalCourseName + " " + GlobalHook.getGlobalCourseTeacher,
        vimeoId: GlobalHook.getGlobalVimeoId
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      window.location.href = `/teacher/${NewCourseSlug}`;
    })
    .catch(err => {
      console.log(err);
    });
}


function UpdataCourseStatusAction(GlobalHook, courseSlug, courseStatus) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseSlug: courseSlug,
    courseActive: courseStatus
  };

  axios
    .post("/api/course/status", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
}

function UpdataCoursepublishAction(GlobalHook, courseSlug, coursePublish) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseSlug: courseSlug,
    coursePublish: coursePublish
  };

  axios
    .post("/api/course/publish", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
}

function DeleteCourseLessionAction(GlobalHook,courseSlug) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseSlug: courseSlug,
    vimeoId: GlobalHook.getGlobalVimeoId
  };

  axios
    .post("/api/course/delete", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      window.location.href="/teacher";
    })
    .catch(err => {
      console.log(err);
    });
}

function SetCourseReviewAction(GlobalHook, courseReview) {
  GlobalHook.setGlobalLoading(true);

  const pushData = {
    courseId: GlobalHook.getGlobalcourseId,
    courseReview: courseReview
  };

  axios
    .post("/api/course/setreview", pushData)
    .then(res => {
      GlobalHook.setGlobalCourseReviewPool(
        res.data.courseReview
      );

      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
}

export {
  getCoursePoolAction,
  getCoursePoolAllAction,
  courseSearchKeywordAction,
  courseSearchCatAction,
  getCourseContentAction,
  CreateCourseAction,
  GetMediaFreeAction,
  UpdataCourseStatusAction,
  DeleteCourseLessionAction,
  UpdataCoursepublishAction,
  GetCourseSettingAction,
  SaveCourseSetting,
  SetCourseReviewAction,
  getSubjectCategories,
  getSubjectLevels,
  getSubjectMenu,
  deleteQuestionsInQuiz,
  MoveVimeoVideoToFolder,
};
