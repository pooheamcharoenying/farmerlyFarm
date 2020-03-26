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




export {
    getSchoolPoolAction,

}