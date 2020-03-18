import React, { useContext, useEffect, useState } from "react";
import { Progress, message, Modal, Icon } from "antd";
import axios from 'axios'
import { GlobalContext } from "../../hook/GlobalHook";
import Drag from "../drag/MainDragCourse";
import { CourseSubscriptionAction } from "../../actions";
import "./poohStyle.css";
import CheckoutInternetBanking from "../checkout/CheckoutInternetBanking";




export default function SideBarCourse() {

  const GlobalHook = useContext(GlobalContext);
  const [getuserCouresLogLength, setuserCouresLogLength] = useState(0);
  const [getMainCourseLength, setMainCourseLength] = useState(0);

  const [getisSubscription, setisSubscription] = useState(false);
  const [getShowCourseFeeAlertModal, setShowCourseFeeAlertModal] = useState(
    false
  );
  const [getUserId,setUserId] = useState("")

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      setUserId(GlobalHook.getGlobalUser._id)
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    } else {
      setisSubscription(false);
    }
  });

  function BeforehandleSubscription() {
    if (!GlobalHook.getGlobalToken) {
      GlobalHook.setGlobalShowLoginModal(true);
      GlobalHook.setGlobalLoginTab("Signup");
    } else {
      console.log(GlobalHook.getGlobalCourseFee);
      if (GlobalHook.getGlobalCourseFee == "true") {
        CourseSubscriptionAction(GlobalHook);
      } else {
        //  alert("เสียตัง " + GlobalHook.getGlobalCoursePrice)
        GlobalHook.setGlobalShowCourseFeeAlertModal(true);
      }
    }
  }

  let cart =  {}
  useEffect(() => {
    if( GlobalHook.getGlobalCourseFee){

    }
  
  }, [ GlobalHook.getGlobalCourseFee, GlobalHook.getGlobalcourseId])
  
    function createInternetBankingCharge(iuid, courseId, amount, token) {
    GlobalHook.setGlobalShowCourseFeeAlertModal(false);
    CourseSubscriptionAction(GlobalHook);

    message.success("Payment Successfull");

    // console.log(iuid)
    // console.log(courseId)
    // console.log(amount)
    // console.log(token)
    // console.log("procress")
    // try {
    //   const res = await axios({
    //     method: "POST",
    //     url: "/api/checkout/internetbank",
    //     data: { iuid, courseId, amount, token },
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });

    //   if (res.data) {
    //    console.log(res.data)
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };




  function RenderCourseFeeAlert() {
    return (
      <Modal
        visible={GlobalHook.getGlobalShowCourseFeeAlertModal}
        onOk={() => GlobalHook.setGlobalShowCourseFeeAlertModal(false)}
        onCancel={() => {
          GlobalHook.setGlobalShowCourseFeeAlertModal(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => GlobalHook.setGlobalShowCourseFeeAlertModal(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            {/* <button
              onClick={() => {
                GlobalHook.setGlobalShowCourseFeeAlertModal(false);
                CourseSubscriptionAction(GlobalHook);

                message.success("Payment Successfull");
              }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Complete Payment
            </button> */}
         
            <CheckoutInternetBanking amount={GlobalHook.getGlobalCoursePrice} courseId={GlobalHook.getGlobalcourseId} iuid={getUserId}
          createInternetBankingCharge={createInternetBankingCharge}/>
          </div>
        ]}
      >
        <div className="flex flex-col items-center">
        
          <div className="font-bold text-2xl text-black mb-4">CHECKOUT</div>

          <div
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              maxHeight: "360px",
              minHeight: "360px"
            }}
            className="bg-white flex flex-col shadow-lg rounded-lg relative "
          >
            <div className="bg-gray-500 absolute inset-0 opacity-0 hover:opacity-25"></div>
            <img
              className="w-full object-cover rounded-lg rounded-b-none"
              style={{ minHeight: "180px", maxHeight: "180px" }}
              src={
                GlobalHook.getGlobalCourseImage ||
                "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
              }
            />
            <div
              className="text-xl mt-2 font-bold text-gray-900 px-2 capitalize text2line"
              style={{ minHeight: "60px", maxHeight: "60px" }}
            >
              {GlobalHook.getGlobalCourseName || ""}
            </div>
            <div
              className="px-2 mt-2 text2line "
              style={{ minHeight: "40px", maxHeight: "40px" }}
            >
              {GlobalHook.getGlobalCourseDescription || ""}
            </div>
            <div
              className="px-2 mt-2 flex items-center truncate"
              style={{ minHeight: "20px", maxHeight: "20px" }}
            >
              <Icon type="user" />
              <div className="truncate ml-1">
                {GlobalHook.getGlobalCourseTeacher || ""}
              </div>
            </div>
            <div
              className="flex justify-between px-2 my-2"
              style={{ minHeight: "20px", maxHeight: "20px" }}
            >
              <div className="flex items-center truncate">
                <Icon type="stock" />
                <div className="truncate ml-1">
                  {GlobalHook.getGlobalCourseLevel || ""}
                </div>{" "}
              </div>
              <div className="flex items-center truncate">
                <Icon type="wallet" />
                <div className="truncate ml-1">
                  {GlobalHook.getGlobalCourseSubject || ""}
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="mt-4 font-semibold">
            Total: {GlobalHook.getGlobalCoursePrice} บาท
          </div>
        </div>
      </Modal>
    );
  }

  useEffect(() => {
    if (
      GlobalHook.getGlobalUser &&
      GlobalHook.getGlobalCourseStructure &&
      GlobalHook.getGlobalcourseId
    ) {
      var mainlength = 0;
      const courseIdIndex = GlobalHook.getGlobalUser.courseSubscription
        .map(data => data.courseId)
        .indexOf(GlobalHook.getGlobalcourseId);

      if (
        GlobalHook.getGlobalUser.courseSubscription[courseIdIndex] != undefined
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
  }, [
    GlobalHook.getGlobalUser,
    GlobalHook.getGlobalcourseId,
    GlobalHook.getGlobalCourseStructure
  ]);

  return (
    <div
      className=" w-10/12 md:w-5/12 pb-64 xl:w-3/12 mt-16 fixed md:relative top-0 left-0  flex-col z-30 hidden md:flex pooh"
      style={{
        display: GlobalHook.getGlobalShowSideBarStatus ? "flex" : "",
        overflowY: "scroll"
        // maxHeight:"120vh"
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
      <div style={{ minHeight: "60px" }}></div>
    </div>
  );
}
