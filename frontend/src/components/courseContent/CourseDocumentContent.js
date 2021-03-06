import React, { useContext, useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import ReactQuill from "react-quill";
import BottomScrollListener from 'react-bottom-scroll-listener'
// import TextEditorComp from '../textEditor/TextEditorCompCourse'

import { GlobalContext } from "../../hook/GlobalHook";
import { LessionVisitedLogAction } from '../../actions'
import { OmitProps } from "antd/lib/transfer/renderListBody";

export default function CourseDocumentContent(props) {
  const GlobalHook = useContext(GlobalContext);

  const [getEditorData, setEditorData] = useState("");

  const [getisSubscription, setisSubscription] = useState(false);
  const [getStartLessonTime, setStartLessonTime] = useState(0)
  const [getLessonSessionLogged, setLessonSessionLogged] = useState(false)


  // useEffect(() => {
  //   window.addEventListener('scroll', function() {
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //        console.log("you're at the bottom of the page");
  //        //show loading spinner and make fetch request to api
  //     }
  //  });
  //   return () => {
  //     window.removeEventListener('scroll', function() {
  //      console.log("remove")
  //     });
  //   };
  // },)


  // useEffect(() => {
  //   window.addEventListener('scroll', function() {
  //     console.log("scroll")
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //        console.log("you're at the bottom of the page");
  //        //show loading spinner and make fetch request to api
  //     }
  //  });
  //   // clean up
  //   return () => {
  //     window.removeEventListener('scroll', function() {
  //       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //          console.log("you're at the bottom of the page");
  //          //show loading spinner and make fetch request to api
  //       }
  //    });
  //   }
  // }, []); // empty array => run only once



  useEffect(() => {


    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    } else {
      setisSubscription(false);
    }
  });

  useEffect(() => {
    console.log('mamamia')
    setLessonSessionLogged(false)
  },[GlobalHook.getGlobalLessionSelect])

  useEffect(() => {
    console.log('whats up doc')
    // console.log(props.scrollAtBottom)
    setStartLessonTime(Date.now())
    if (typeof GlobalHook.getGlobalMediaDocument == "string") {
      setEditorData(GlobalHook.getGlobalMediaDocument);
    }
  }, [GlobalHook.getGlobalMediaDocument]);

  function BottomDetect() {

      console.log('hit rock bottom')
      console.log(getLessonSessionLogged)
      if (GlobalHook.getGlobalToken && getisSubscription) {
        setLessonSessionLogged(true)
        console.log('log lesson data')
        LessionVisitedLogAction(GlobalHook, GlobalHook.getGlobalLessionSelect.mediaId, getStartLessonTime)
      }
    

  }



  return (
    // <BottomScrollListener onBottom={BottomDetect}>
    <div className=" w-full flex flex-col items-center justify-start py-4" onScroll={(e) => { console.log("e") }}>

      <div className="w-full flex mb-2  justify-center items-center">
        <FaCaretLeft
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("PrevLession")}
        />

        <div className="w-10/12 rounded-lg text-center text-white text-xl md:text-2xl font-bold  bg-blue-500 mx-2 py-2 px-2">
          {GlobalHook.getGlobalLessionSelect.mediaName}
        </div>
        <FaCaretRight
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("NextLession")}
        />
      </div>


      {/* <div className=" w-full min-h-full px-2 md:px-4 lg:px-6 mx-auto my-4 rounded">
        <ReactQuill
          value={getEditorData || ""}
          theme="snow"
          className="hide-toolbar"
          readOnly
        />
      </div> */}


      <div >
        <ReactQuill
          value={getEditorData || ""}
          theme="snow"
          className="hide-toolbar"
          readOnly
        />
      </div>

      <button
                onClick={() => {GlobalHook.setPrevNextStatus("NextLession")
                }}
                className="bg-green-500 text-white p-2 rounded hover:bg-blue-400"
                style={{marginTop:"5vh"}}
              >
                อ่านเสร็จแล้ว
              </button>
      {/* {console.log("proppiness")}
      {console.log(getLessonSessionLogged)} */}

      <div style={{ minHeight: "10vh" }} />

    </div>
    // </BottomScrollListener >


  );
}
