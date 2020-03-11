import React, { useContext, useEffect, useState } from "react";
import { Progress, message,Modal } from "antd";
import { GlobalContext } from "../../hook/GlobalHook";
import Drag from "../drag/MainDragCourse";
import { CourseSubscriptionAction } from "../../actions";
export default function SideBarCourse() {
  const GlobalHook = useContext(GlobalContext);
  const [getuserCouresLogLength, setuserCouresLogLength] = useState(0);
  const [getMainCourseLength, setMainCourseLength] = useState(0);
  
  const [getisSubscription, setisSubscription] = useState(false);
  const [getShowCourseFeeAlertModal,setShowCourseFeeAlertModal] = useState(false)

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }

      });
    }else{
      setisSubscription(false);
    }
  }, );

  function BeforehandleSubscription() {
    if (!GlobalHook.getGlobalToken) {
      GlobalHook.setGlobalShowLoginModal(true);
      GlobalHook.setGlobalLoginTab("Signup");
    } else {
      console.log(GlobalHook.getGlobalCourseFee)
      if(GlobalHook.getGlobalCourseFee == "true"){
        CourseSubscriptionAction(GlobalHook);
      }else{
      //  alert("เสียตัง " + GlobalHook.getGlobalCoursePrice)
      setShowCourseFeeAlertModal(true)

      }
    }
  }

  function RenderCourseFeeAlert() {
    return (
      <Modal
        visible={getShowCourseFeeAlertModal}
        title="Pay"
        onOk={() => setShowCourseFeeAlertModal(false)}
        onCancel={() => {
          setShowCourseFeeAlertModal(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setShowCourseFeeAlertModal(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>

            <button
              onClick={() => {
                setShowCourseFeeAlertModal(false);
               message.success("Payment Successfull")
              }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Pay
            </button>

          
          </div>
        ]}
      >
        Pay
      </Modal>
    );
  }

  useEffect(() => {
    if (GlobalHook.getGlobalUser&&GlobalHook.getGlobalCourseStructure&&GlobalHook.getGlobalcourseId) {
      var mainlength = 0;
      const courseIdIndex = GlobalHook.getGlobalUser.courseSubscription
        .map(data => data.courseId)
        .indexOf(GlobalHook.getGlobalcourseId);

    
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
      className=" bg-gray-300 w-10/12 md:w-5/12 pb-64 xl:w-3/12 mt-16 fixed md:relative top-0 left-0  flex-col z-30 hidden md:flex"
      style={{
        display: GlobalHook.getGlobalShowSideBarStatus ? "flex" : "",
        overflowY: "scroll",
        maxHeight:"100vh"
        
      }}
    >
      {RenderCourseFeeAlert()}
      <div
        className="bg-blue-300 flex flex-col px-6 w-full "
        style={{ minHeight: "150px" }}
      >
        <div
          className="bg-white rounded my-4 text-center shadow-lg  text-lg truncate"
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
      <div style={{minHeight:"60px"}}></div>
    </div>
  
  );
}
