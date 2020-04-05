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

function AddMyNewSchoolAction(GlobalHook,schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId};

  
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

function FindStudentBySchoolAction(GlobalHook,schoolId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { schoolId};

  
  axios
    .post("/api/school/findstudentbyschool", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      GlobalHook.setGlobalMatchStudentBySchool(res.data)
    })
    .catch(err => console.log(err));
}

function SchoolStatusChangeAction(GlobalHook,status,userId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { status,userId,schoolId:GlobalHook.getGlobalUser.schoolAdminId};

  axios
    .post("/api/school/changestudentschoolstatusAction", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      window.location.reload()
      
    })
    .catch(err => console.log(err));
}


function GetStudentSchoolCourseAction(GlobalHook,userId) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { userId,schoolId:GlobalHook.getGlobalUser.schoolAdminId};


  
  axios
    .post("/api/school/getstudentschoolcourse", pushData)
    .then(res => {
      GlobalHook.setGlobalLoading(false);
      console.log(res.data)
      // GlobalHook.setGlobalMatchStudentBySchool(res.data)
    })
    .catch(err => console.log(err));
}


export {
    getSchoolPoolAction,
    AddMyNewSchoolAction,
    FindStudentBySchoolAction,
    SchoolStatusChangeAction,
    GetStudentSchoolCourseAction

}