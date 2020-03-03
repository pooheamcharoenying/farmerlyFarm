import React, { useContext } from "react";

function CheckSubscription(){
    if (GlobalHook.getGlobalUser) {
        GlobalHook.getGlobalUser.courseSubscription.map(data => {
          if (data.courseId == GlobalHook.getGlobalcourseId) {
            setisSubscription(true);
          }
        });
      }
}

export { CheckSubscription}