import React, { useContext, useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../hook/GlobalHook";
import CourseCard from "../courseCard/CourseCard";
import SchoolCard from "../courseCard/SchoolCard";

export default function MyCourse() {
  const GlobalHook = useContext(GlobalContext);
  let history = useHistory();

  const [getcourseMatchPool, setcourseMatchPool] = useState([]);
  const [getSchoolMatchPool, setSchoolMatchPool] = useState([]);

  var myCourseMatch = [];

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCoursePool[0]) {
      GlobalHook.getGlobalCoursePool.map(allCourseList =>
        GlobalHook.getGlobalUser.courseSubscription.map(subList => {
          if (allCourseList._id == subList.courseId) {
            myCourseMatch.push(allCourseList);
            setcourseMatchPool(myCourseMatch);

          
          }
        })
      );
    }


  // useEffect(() => {
  //   if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCoursePool[0]) {
  //     GlobalHook.getGlobalUser.courseSubscription.map(subList =>
  //       GlobalHook.getGlobalCoursePool.map(allCourseList => {
  //         if (allCourseList._id == subList.courseId) {
  //           myCourseMatch.push(allCourseList);
  //           setcourseMatchPool(myCourseMatch);

          
  //         }
  //       })
  //     );
  //   }

    // if(GlobalHook.getGlobalSchoolPool[0]){
    //   setschoolDataLocal(GlobalHook.getGlobalSchoolPool)
    // }
  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalCoursePool,GlobalHook.getGlobalSchoolPool]);

let LocalSchoolMatch = []
  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalSchoolPool[0]) {
      GlobalHook.getGlobalSchoolPool.map(allSchoolList => {
        if (GlobalHook.getGlobalUser.schoolCourse[0]) {
          GlobalHook.getGlobalUser.schoolCourse.map(subList => {
            if ((allSchoolList._id == subList.schoolId) && subList.schoolApproved) {
       LocalSchoolMatch.push(allSchoolList);
       setSchoolMatchPool(LocalSchoolMatch)

              
            } 
          });
        } 
      });
    }
  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalSchoolPool]);


  function RenderNotLoginMyCourse() {
    return (
      <>
        <div className="mt-10 text-2xl text-center px-6 mb-10 font-bold text-gray-900">
          เริ่มต้นการเรียนรู้ของคุณ
          <span className="text-green-600 mx-4">ฟรี</span>
          สมัครวันนี้ไม่มีค่าใช้จ่าย
        </div>
        <div className="flex justify-between mb-10 text-lg w-11/12 md:w-8/12 lg:w-7/12">
          <div className="flex flex-col items-center ">
            <div className="bg-orange-900  rounded-full w-16 h-16 flex justify-center items-center mb-4 text-2xl text-white">
              1.
            </div>
            <div className="text-center mb-4" style={{ maxWidth: "200px" }}>
              ค้นหาคอร์ส
            </div>
            <div className="text-center text-sm" style={{ maxWidth: "200px" }}>
              ค้นหาคอร์สและเนื้อหาตามที่คุณสนใจ
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="bg-orange-900 rounded-full w-16 h-16 flex justify-center items-center mb-4 text-2xl text-white">
              2.
            </div>
            <div className="text-center mb-4" style={{ maxWidth: "200px" }}>
              สมัครคอร์ส
            </div>
            <div className="text-center text-sm" style={{ maxWidth: "200px" }}>
              เมื่อเจอคอร์สที่ใช่แล้วก็สมัครเลย
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="bg-orange-900 rounded-full w-16 h-16 flex justify-center items-center mb-4 text-2xl text-white">
              3.
            </div>
            <div className="text-center mb-4" style={{ maxWidth: "200px" }}>
              เริ่มเรียน
            </div>
            <div className="text-center text-sm" style={{ maxWidth: "200px" }}>
              สมัครคอร์สที่ต้องการแล้วก็เริ่มเรียนเลย!
            </div>
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 rounded p-4 text-white text-2xl font-bold "
          onClick={() => {
            GlobalHook.setGlobalShowLoginModal(true);
            GlobalHook.setGlobalLoginTab("Signup");
          }}
        >
          สมัครคอร์ส
        </button>
      </>
    );
  }

  function RenderLoginedMyCourse() {
    if (getcourseMatchPool[0] || getSchoolMatchPool[0]) {
      return (
        <ScrollContainer
          hideScrollbars={false}
          vertical={false}
          className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5"
        >
          {getSchoolMatchPool.map((schoolData, i) => (
            <div
           
              key={i}
              className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
              // onClick={() => history.push(`/course/${courseData.courseSlug}`)}
              onClick={()=>window.location.href=`/school/${schoolData.schoolSlug}`}
            >
              <SchoolCard schoolData={schoolData} />
            </div>
          ))}
          {getcourseMatchPool.map((courseData, i) => (
            <div
           
              key={i}
              className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
              // onClick={() => history.push(`/course/${courseData.courseSlug}`)}
              onClick={()=>window.location.href=`/course/${courseData.courseSlug}`}
            >
              <CourseCard courseData={courseData} />
            </div>
          ))}
        </ScrollContainer>
      );
    } else {
      return <div className="mt-10">"คุณยังไม่คอร์สที่เลือก"</div>;
    }
  }

  return (
    <div className="bg-yellow-300 w-full">
      <div
        className="bg-yellow-300 flex flex-col py-10 items-center mx-auto  "
        style={{ minHeight: "300px", maxWidth: "1500px" }}
      >
        <div
          className="w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold"
          style={{ backgroundColor: "#41d6c3" }}
        >
          คอร์สของฉัน
        </div>
        {!GlobalHook.getGlobalToken
          ? RenderNotLoginMyCourse()
          : RenderLoginedMyCourse()}
      </div>
    </div>
  );
}
