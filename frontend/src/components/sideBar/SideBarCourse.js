import React, { useContext, useEffect, useState } from "react";
import { Progress } from "antd";
import { GlobalContext } from "../../hook/GlobalHook";
import Drag from "../drag/MainDragCourse";
import { CourseSubscriptionAction } from "../../actions";
export default function SideBarCourse() {
  const GlobalHook = useContext(GlobalContext);
  const [getuserCouresLogLength, setuserCouresLogLength] = useState(0);
  const [getMainCourseLength, setMainCourseLength] = useState(0);
  
  const [getisSubscription, setisSubscription] = useState(false);

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.setGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
    
          setisSubscription(true);
        }

      });
    }
  }, [GlobalHook.getGlobalUser,GlobalHook.getGlobalcourseId]);

  function BeforehandleSubscription() {
    if (!GlobalHook.getGlobalToken) {
      GlobalHook.setGlobalShowLoginModal(true);
      GlobalHook.setGlobalLoginTab("Signup");
    } else {
      console.log(GlobalHook.getGlobalcourseId)
      CourseSubscriptionAction(GlobalHook);
    }
  }
  useEffect(() => {
    if (GlobalHook.getGlobalUser&&GlobalHook.getGlobalCourseStructure&&GlobalHook.getGlobalcourseId) {
      var mainlength = 0;
      const courseIdIndex = GlobalHook.getGlobalUser.courseSubscription
        .map(data => data.courseId)
        .indexOf(GlobalHook.getGlobalcourseId);

        console.log(courseIdIndex)
      if (
        GlobalHook.getGlobalUser.courseSubscription[courseIdIndex] !=
        undefined
      ) {
        setuserCouresLogLength(
          GlobalHook.getGlobalUser.courseSubscription[courseIdIndex].courseLog
            .length
        );
      }
      GlobalHook.getGlobalCourseStructure.map(data => {

        mainlength = mainlength + data.subItems.length - 1;
      });

      setMainCourseLength(mainlength);
    }
  }, [GlobalHook.getGlobalUser,GlobalHook.getGlobalcourseId,GlobalHook.getGlobalCourseStructure]);


  return (
    <div
      className="bg-gray-300 w-10/12 md:w-5/12  xl:w-3/12 mt-16 fixed md:relative top-0 left-0 flex-col h-auto z-30 hidden md:flex"
      style={{
        display: GlobalHook.getGlobalShowSideBarStatus ? "flex" : "",
        overflowY: "auto"
      }}
    >
      <div
        className="bg-blue-300 flex flex-col px-6 w-full "
        style={{ minHeight: "150px" }}
      >
        <div
          className="bg-white rounded my-4 text-center shadow-lg  text-lg "
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          {"คอร์ส: " + GlobalHook.getGlobalCourseName}
        </div>
        {getisSubscription ? (
          <div
            className="bg-white rounded mb-4 text-center shadow-lg  text-lg px-4"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <Progress
              percent={parseInt(
                (getuserCouresLogLength / getMainCourseLength) * 100
              )}
              status="active"
            />
          </div>
        ) : (
          <div
            className="bg-white rounded mb-4 text-center shadow-lg px-4 flex items-center justify-center"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <div>ฟรีไม่มีค่าใช้จ่าย</div>
            <button
              className="bg-red-500 hover:bg-red-400 p-2 ml-2 rounded"
              onClick={() => {
                BeforehandleSubscription();
              }}
            >
              สมัครคอร์ส
            </button>
          </div>
        )}
      </div>

      <div
        className="bg-blue-500 hover:bg-blue-400 rounded my-4 text-center shadow-lg text-white text-lg mx-2 cursor-pointer"
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
        onClick={() => {
          GlobalHook.setGlobalLessionSelect({ mediaType: "Overview" });
          GlobalHook.setGlobalShowSideBarStatus(false);
        }}
      >
        รายละเอียดคอร์ส
      </div>

      <div
        className="bg-orange-500 hover:bg-orange-400 rounded mb-4 text-center shadow-lg text-white text-lg mx-2 cursor-pointer"
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
        onClick={() => {
          GlobalHook.setGlobalLessionSelect({ mediaType: "Review" });
          GlobalHook.setGlobalShowSideBarStatus(false);
        }}
      >
        Rating & Review
      </div>

      <Drag />
      <div style={{minHeight:"60px"}}/>
    </div>
  
  );
}
