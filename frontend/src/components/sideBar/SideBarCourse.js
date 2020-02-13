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
    if (GlobalHook.getGlobalUser) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseName == GlobalHook.getGlobalCourseName) {
          setisSubscription(true);
        }
      });
    }
  }, [GlobalHook.getGlobalUser]);

  function BeforehandleSubscription() {
    if (!GlobalHook.getGlobalToken) {
      GlobalHook.setGlobalShowLoginModal(true);
      GlobalHook.setGlobalLoginTab("Signup");
    } else {
      CourseSubscriptionAction(GlobalHook);
    }
  }
  useEffect(() => {
    if (GlobalHook.getGlobalUser&&GlobalHook.getGlobalCourseContent[0]) {
      var mainlength = 0;
      const courseNameIndex = GlobalHook.getGlobalUser.courseSubscription
        .map(data => data.courseName)
        .indexOf(GlobalHook.getGlobalCourseName);
      if (
        GlobalHook.getGlobalUser.courseSubscription[courseNameIndex] !=
        undefined
      ) {
        setuserCouresLogLength(
          GlobalHook.getGlobalUser.courseSubscription[courseNameIndex].courseLog
            .length
        );
      }
      GlobalHook.getGlobalCourseContent[0].contentStructure.map(data => {

        mainlength = mainlength + data.subItems.length - 1;
      });

      setMainCourseLength(mainlength);
    }
  }, [GlobalHook.getGlobalUser]);


  return (
    <div
      className="bg-gray-300 w-10/12 md:w-5/12  xl:w-3/12 mt-16 fixed md:relative top-0 left-0 flex-col h-full z-40 hidden md:flex"
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

      <Drag />
      <div style={{minHeight:"60px"}}/>
    </div>
  
  );
}
