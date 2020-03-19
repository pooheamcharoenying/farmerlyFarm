import React, { useContext,useState,useEffect } from "react";
import CourseVideoContent from "./CourseVideoContent";
import CourseQuizContent from "./CourseQuizContent";
import CourseDocumentContent from "./CourseDocumentContent";
import CourseOverviewContent from "./CourseOverviewContent";
import CourseReviewContent from "./CourseReviewContent";

import './CourseContent.css'

import { GlobalContext } from "../../hook/GlobalHook";
import { FaCalculator } from "react-icons/fa";

export default function CourseContent() {
const GlobalHook = useContext(GlobalContext)


  function RenderSwitch() {
    switch (GlobalHook.getGlobalLessionSelect.mediaType) {
      case "Video":
        return <CourseVideoContent/> ;
        break;
      case "Document":
        return <CourseDocumentContent />;
        break;
      case "Quiz":
        return <CourseQuizContent />;
        break;
      case "Overview":
        return <CourseOverviewContent />;
        break;
        case "Review":
        return <CourseReviewContent />;
        break;
      default:
        return <CourseOverviewContent />;
        break;
    }
  }
  

  return (
    <div className=" bg-gray-100 flex-1 mt-16 responsiveCourseHeight" >
        {RenderSwitch()}
        {GlobalHook.getGlobalShowSideBarStatus? <div className="absolute inset-0 min-h-screen min-w-full bg-black opacity-50 z-20  md:hidden"/>:<div/>}
        
    </div>
  );
}
