import React from "react";
import axios from "axios";
import { message } from "antd";
function getSchoolPoolAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true);
  axios
    .get("/api/school")
    .then(res => {
      // console.log(res.data)
      GlobalHook.setGlobalSchoolPool(res.data);
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}

function AddMyNewSchoolAction(GlobalHook, schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId };

  axios
    .post("/api/school/addmynewschool", pushData)
    .then(res => {
      GlobalHook.setGlobalUser(res.data);
      localStorage.setItem("globalUser", JSON.stringify(res.data));
      // CourseSubscriptorActior(GlobalHook)
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}


function RemoveMySchoolAction(GlobalHook, schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId };
  console.log('removeMySchool')
  console.log(pushData)
  axios
    .post("/api/school/removemyschool", pushData)
    .then(res => {
      GlobalHook.setGlobalUser(res.data);
      localStorage.setItem("globalUser", JSON.stringify(res.data));
      // CourseSubscriptorActior(GlobalHook)
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}


function FindStudentBySchoolAction(GlobalHook, schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId };

  axios
    .post("/api/school/findstudentbyschool", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      GlobalHook.setGlobalMatchStudentBySchool(res.data)

      console.log(res.data)
    })
    .catch(err => console.log(err));
}

function SchoolStatusChangeAction(GlobalHook, status, userId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { status, userId, schoolId: GlobalHook.getGlobalUser.schoolAdminId };

  axios
    .post("/api/school/changestudentschoolstatusAction", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      window.location.reload()

      // console.log(res.data)

      // FindStudentBySchoolAction(GlobalHook,GlobalHook.getGlobalUser.schoolAdminId)

    })
    .catch(err => console.log(err));
}


function GetStudentSchoolCourseAction(GlobalHook, userId, schoolCourseData) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { uid: userId, schoolId: GlobalHook.getGlobalUser.schoolAdminId };



  axios
    .post("/api/school/getstudentschoolcourse", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);


      var tempData = []
      // var tempObject = new Object();
      for (var item of res.data.SchoolCourseList) {
        item = schoolCourseData.filter( course => course.courseId == item._id)
        console.log('elfy')
        console.log(item)
        var tempObject = {
          key: item[0].key,
          cover: item[0].Cover,
          courseName: item[0].CourseName,
          courseId: item[0].courseId,
        }
        tempData.push(tempObject)
        console.log(item)
      }

      console.log('returnStudentClick')
      // console.log(schoolCourseData)
      console.log(tempData)

      GlobalHook.setGlobalMatchStudentCourseSchool(tempData)


    })
    .catch(err => console.log(err));
}

function getmatchschoolcourseAction(GlobalHook, schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId };


  axios
    .post("/api/school/getmatchschoolcourse", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      GlobalHook.setGlobalMatchCourseSchool(res.data)
    })
    .catch(err => console.log(err));
}


function AssignCourseToUserAction(GlobalHook, userUid, schoolId, courseId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { userUid, schoolId, courseId };

  console.log('pushData')
  console.log(pushData)

  axios
    .post("/api/school/assigncoursetouser", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      console.log('AssignCourseToUser')
      console.log(res.data)
      var tempData = [];
      for (var index in res.data.SchoolCourseList) {
        console.log('jajamiao')
        console.log(res.data)
        console.log(GlobalHook.getGlobalMatchCourseSchool)
        var filterRes = GlobalHook.getGlobalMatchCourseSchool.filter(item => item._id == res.data.SchoolCourseList[index]._id)
        tempData[index] = { _id: res.data.SchoolCourseList[index]._id, cover:filterRes[0].courseImage, courseName:filterRes[0].courseName, courseId:filterRes[0].courseId }
      }
      GlobalHook.setGlobalMatchStudentCourseSchool(tempData)

    })
    .catch(err => console.log(err));
}


function DelCourseToUserAction(GlobalHook, userId, schoolId, courseId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { userId, schoolId, courseId };
  console.log(pushData)

  axios
    .post("/api/school/delcoursetouser", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      // GlobalHook.setGlobalMatchStudentCourseSchool(res.data.SchoolCourseList)

      var tempData = [];
      for (var index in res.data.SchoolCourseList) {
        console.log('jajamiao')
        console.log(res.data)
        console.log(GlobalHook.getGlobalMatchCourseSchool)
        var filterRes = GlobalHook.getGlobalMatchCourseSchool.filter(item => item._id == res.data.SchoolCourseList[index]._id)
        tempData[index] = { _id: res.data.SchoolCourseList[index]._id, cover:filterRes[0].courseImage, courseName:filterRes[0].courseName, courseId:filterRes[0]._id }
      }
      GlobalHook.setGlobalMatchStudentCourseSchool(tempData)

    })
    .catch(err => console.log(err));
}

function getSchoolIdBySlugAction(GlobalHook, schoolSlug) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolSlug };


  axios
    .post("/api/school/getschoolidbyslug", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      GlobalHook.setGlobalMatchCourseSchool(res.data)
    })
    .catch(err => console.log(err));
}


function getSchoolInfoByIdAction(GlobalHook, schoolId) {

  const pushData = { schoolId };


  axios
    .post("/api/school/getschoolinfobyid", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      GlobalHook.setGlobalSchoolInfo(res.data)
    })
    .catch(err => console.log(err));
}

function handleSchoolInviteAcceptAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true);


  const pushData = { schoolSlug: GlobalHook.getGlobalSchoolSlug };


  axios
    .post("/api/school/getschoolidbyslug", pushData)
    .then(res => {
      if (res.data[0]) {


        const pushDataId = { schoolId: res.data[0]._id };


        axios
          .post("/api/school/addmynewschool", pushDataId)
          .then(res => {
            GlobalHook.setGlobalUser(res.data);
            localStorage.setItem("globalUser", JSON.stringify(res.data));

            window.location.href = `/school/${GlobalHook.getGlobalSchoolSlug}`
            GlobalHook.setGlobalLoading(false);
          })
          .catch(err => { console.log(err); window.location.href = "/" });
      }
    })
    .catch(err => { console.log(err); message.error("error") });



}



export {
  getSchoolPoolAction,
  AddMyNewSchoolAction,
  FindStudentBySchoolAction,
  SchoolStatusChangeAction,
  GetStudentSchoolCourseAction,
  getmatchschoolcourseAction,
  AssignCourseToUserAction,
  DelCourseToUserAction,
  getSchoolIdBySlugAction,
  getSchoolInfoByIdAction,
  handleSchoolInviteAcceptAction,
  RemoveMySchoolAction

}