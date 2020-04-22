import React, { useContext, useEffect, useState } from "react";
import { Progress, message, Modal, Icon } from "antd";
import axios from "axios";
import { GlobalContext } from "../../hook/GlobalHook";
import Drag from "../drag/MainDragCourse";
import { CourseSubscriptionAction } from "../../actions";
import './SideBarCourse.css'

import CheckoutInternetBanking from "../checkout/CheckoutInternetBanking";
import CheckoutCreditcard from "../checkout/CheckoutCreditCard";

import jsPDF from 'jspdf';
import imageDataURI from 'image-data-uri';

export default function SideBarCourse() {
  const GlobalHook = useContext(GlobalContext);
  const [getuserCouresLogLength, setuserCouresLogLength] = useState(0);
  const [getMainCourseLength, setMainCourseLength] = useState(0);

  const [getisSubscription, setisSubscription] = useState(false);
  const [getShowCourseFeeAlertModal, setShowCourseFeeAlertModal] = useState(
    false
  );
  const [getUserId, setUserId] = useState("");
  const [getUserEmail, setUserEmail] = useState("");
  const [getUserPMid, setUserPMid] = useState(null);

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId && GlobalHook.getGlobalCurrentUser) {
      setUserEmail(GlobalHook.getGlobalCurrentUser.email)
      setUserId(GlobalHook.getGlobalCurrentUser.uid);
      setUserPMid(GlobalHook.getGlobalUser.pmid)
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    } else {
      setisSubscription(false);
    }
  });

  function createPdf() {
    // var doc = new jsPDF('l')
    var doc = new jsPDF('l', 'mm', [210, 297]);

    doc.setDrawColor(0)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(10, 10, 277, 190, 3, 3, 'FD')

    // doc.setDrawColor(255, 0, 0)
    // doc.rect(0, 20, 210, 40, 'FD')

    var fontSize = 16;
    doc.setFontSize(fontSize)


    // LOWER CASE TEXT SCALING: text.length*fontSize*0.15
    // UPPER CASE TEXT SCALING: text.length*fontSize*0.208

    // var text = 'This certificate is awarded for the completion of'
    // doc.text(text, (297 - text.length*fontSize*0.2)/2, 80)

    // doc.setDrawColor(255, 0, 0)
    // doc.rect(  (297 - text.length*fontSize*0.2)/2 , 40,  text.length*fontSize*0.15,    10, 'FD')

    fontSize = 30;
    doc.setFontSize(fontSize)
    var text = 'CERTIFICATE'
    doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 80)

    fontSize = 14;
    doc.setFontSize(fontSize)
    text = 'OF COMPLETION'
    doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 90)

    // doc.setDrawColor(255, 0, 0)
    // doc.rect(  (210 - text.length*fontSize*0.208)/2 , 130,  text.length*fontSize*0.208, 10, 'FD')

    fontSize = 14;
    doc.setFontSize(fontSize)
    text = 'AWARDED TO'
    doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 110)

    // var imgData = "data:image/jpeg;base64,https://studysabaiapp.sgp1.digitaloceanspaces.com/mbot.jpg"
    // doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)

    imageDataURI.encodeFromURL('https://studysabaiapp.sgp1.digitaloceanspaces.com/StudySabai%20Certificate%20Template-01-01.jpg')
    // RETURNS image data URI :: 'data:image/png;base64,PNGDATAURI/'
    .then(res => {
      console.log('imageURI')
      console.log(res)




      var doc = new jsPDF('l')

      doc.addImage(res, 'JPEG', 0, 0, 297, 210)



      console.log('munchkin')
      console.log(GlobalHook.getGlobalUser)
      console.log(GlobalHook.getGlobalUserAuth)
      console.log(GlobalHook.getGlobalCurrentUser)
  
      // User name in certificate
      fontSize = 32;
      doc.setFontSize(fontSize)
      text = GlobalHook.getGlobalCurrentUser.email.toUpperCase();
      doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 125)
  
  
      // fontSize = 14;
      // doc.setFontSize(fontSize)
      // text = 'COMPLETION OF COURSE'
      // doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 140)
  
      // Course name in certificate
      fontSize = 18;
      doc.setFontSize(fontSize)
      text = GlobalHook.getGlobalCourseSlug.toUpperCase();
      // doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 150)
      doc.text(text, (297 - text.length * fontSize * 0.208) * 210 / 297, 164)

      // Date in certificate
      fontSize = 18;
      doc.setFontSize(fontSize)
      var date = new Date()
      text = date.getDay().toString()  + " / " + date.getMonth().toString() + " / " + date.getFullYear().toString();
      // doc.text(text, (297 - text.length * fontSize * 0.208) / 2, 150)
      doc.text(text, (297 - text.length * fontSize * 0.208) * 97 / 297, 164)
      
      
      doc.save('a4.pdf')









    })


  }

  function BeforehandleSubscription() {
    if (!GlobalHook.getGlobalToken) {
      GlobalHook.setGlobalShowLoginModal(true);
      GlobalHook.setGlobalLoginTab("Signup");
    } else {
      if (GlobalHook.getGlobalCourseFee == "true") {
        CourseSubscriptionAction(GlobalHook);
      } else {
        GlobalHook.setGlobalShowCourseFeeAlertModal(true);
      }
    }
  }

  let cart = {};
  useEffect(() => {
    if (GlobalHook.getGlobalCourseFee) {
    }
  }, [GlobalHook.getGlobalCourseFee, GlobalHook.getGlobalcourseId]);


  async function createCreditCardCharge(courseId, amount, token) {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/payment/creditCard",
        data: { "email": getUserEmail, "iuid": getUserId, courseId, amount, token, pmid: getUserPMid },
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data) {
        GlobalHook.setGlobalShowCourseFeeAlertModal(false);
        CourseSubscriptionAction(GlobalHook);

        message.success("Payment Successfull");
      }
    } catch (err) {
      message.error("Payment Fail");
      console.log(err);
    }
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
            <CheckoutCreditcard
              amount={GlobalHook.getGlobalCoursePrice}
              courseId={GlobalHook.getGlobalcourseId}
              createCreditCardCharge={createCreditCardCharge}
              pmid={getUserPMid}
            />


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
        console.log('courseProgress')
        console.log(GlobalHook.getGlobalCourseStructure)
        console.log( GlobalHook.getGlobalUser.courseSubscription[courseIdIndex].courseLog )
        var courseCompletion = true;
        var courseProgressCount = 0;
        for (var section of GlobalHook.getGlobalCourseStructure) {
          for(var lesson of section.subItems ) {
            // console.log("lesson")
            // console.log(lesson)
            if (lesson.type != "Quiz") {
              var filterResult = GlobalHook.getGlobalUser.courseSubscription[courseIdIndex].courseLog.filter( logItem => logItem.lessionId == lesson.mediaId ) 
              if (filterResult.length < 1) {
                courseCompletion = false;
              } else {
                courseProgressCount++;
              }
            } else {
              // Lesson is a quiz
              var filtration1 = GlobalHook.getGlobalUser.courseSubscription[courseIdIndex].quizLog.filter( logItem => logItem.lessionId == lesson.mediaId ) 
              var filtration2 = filtration1.filter( quizAttempt => quizAttempt.passResult == true)
              if (filtration2.length > 0) {
                courseProgressCount++;
              } else {
                courseCompletion = false;
              }
            }

          }
        }

        console.log('courseCompletion')
        console.log(courseCompletion)
        console.log(courseProgressCount)
        setuserCouresLogLength(
          // GlobalHook.getGlobalUser.courseSubscription[courseIdIndex].courseLog
          //   .length
          courseProgressCount
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
      className=" w-10/12 md:w-5/12 pb-64 xl:w-3/12 mt-16 fixed md:relative top-0 left-0  flex-col z-30 hidden md:flex responsiveSideBarHeight"
      style={{
        display: GlobalHook.getGlobalShowSideBarStatus ? "flex" : "",
        overflowY: "scroll"
        // maxHeight:"120vh"
      }}
    >
      {RenderCourseFeeAlert()}
      

      {/* <img src={"https://studysabaiapp.sgp1.digitaloceanspaces.com/mbot.jpg"} />
      {console.log('chachacha')}
      {console.log(GlobalHook.getGlobalCourseImage)} */}

      <div
        className="bg-blue-300 flex flex-col px-6 w-full "
        // style={{ minHeight: "180px" }}
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
            {(getuserCouresLogLength / getMainCourseLength == 1)?  <p style={{fontSize:"12px"}}> Congratuations! You've completed the course. </p> : <p style={{fontSize:"12px"}}> Your progress...</p> }
            <Progress
              percent={parseInt(
                (getuserCouresLogLength / getMainCourseLength) * 100
              )}
              status="active"
            />
            {(getuserCouresLogLength / getMainCourseLength == 1)?  <button onClick={createPdf} style={{backgroundColor:"#75EE86", marginTop:"1vh", marginBottom:"1vh", paddingLeft:"2vw", paddingRight:"2vw", paddingTop:"1vh", paddingBottom:"1vh", borderRadius:"2vw"}}> GET CERTIFICATE </button> : <></> }
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
