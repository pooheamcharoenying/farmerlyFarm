import React, { useContext,useState,useEffect } from "react";
import CourseVideoContent from "./CourseVideoContent";
import CourseQuizContent from "./CourseQuizContent";
import CourseDocumentContent from "./CourseDocumentContent";
import CourseOverviewContent from "./CourseOverviewContent";
import CourseReviewContent from "./CourseReviewContent";
import BottomScrollListener from 'react-bottom-scroll-listener'

import './CourseContent.css'

import { GlobalContext } from "../../hook/GlobalHook";
import { FaCalculator } from "react-icons/fa";

export default function CourseContent() {
const GlobalHook = useContext(GlobalContext)

  const [getScrollAtBottom, setScrollAtBottom] = useState(false)
  const [getScrollToBottom, setScrollToBottom] = useState(0)

  function RenderSwitch() {
    console.log('pokey')

    switch (GlobalHook.getGlobalLessionSelect.mediaType) {
      case "Video":
        return <CourseVideoContent/> ;
        break;
      case "Document":
        return <CourseDocumentContent />
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
  
  function handleScroll(event) {
    var scrollPosFromBottom = event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop;
    // if (GlobalHook.getGlobalLessionSelect.mediaType == "Document") {
    //   if (scrollPosFromBottom < 10 ) {
    //     setScrollAtBottom(true)
    //   }
    // }
    // else {
    //   setScrollAtBottom(false)
    // }

  }


  return (

    <div className=" bg-gray-100 flex-1 mt-16 responsiveCourseHeight" onScroll={handleScroll}>
        {RenderSwitch()}
        {GlobalHook.getGlobalShowSideBarStatus? <div className="absolute inset-0 min-h-screen min-w-full bg-black opacity-50 z-20  md:hidden"/>:<div/>}

    </div>
  );
}
