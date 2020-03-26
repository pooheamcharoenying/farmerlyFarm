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
      // console.log(res.data)
      GlobalHook.setGlobalUser(res.data);
      localStorage.setItem("globalUser", JSON.stringify(res.data));
     // CourseSubscriptorActior(GlobalHook)
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}



export {
    getSchoolPoolAction,
    AddMyNewSchoolAction

}