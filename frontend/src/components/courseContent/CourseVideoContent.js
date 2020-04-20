import React, { useContext, useState, useEffect } from "react";
import Vimeo from '@u-wave/react-vimeo';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { GlobalContext } from "../../hook/GlobalHook";
import { LessionVisitedLogAction } from '../../actions'

export default function CourseVideoContent() {
  const GlobalHook = useContext(GlobalContext);
  const [getVideoId, setVideoId] = useState("");

  const [getisSubscription, setisSubscription] = useState(false);
  const [getStartLessonTime, setStartLessonTime] = useState(0)

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
    console.log("startvideolesson")
    console.log(GlobalHook.getGlobalcourseId)
    setStartLessonTime(Date.now())
    if (GlobalHook.getGlobalMediaVideo != "") {
      setVideoId(GlobalHook.getGlobalMediaVideo);
    }
  }, [GlobalHook.getGlobalMediaVideo]);


  function IsEnd() {
    console.log("LogLesson")
    console.log(GlobalHook.getGlobalToken)
    console.log(getisSubscription)

    if (GlobalHook.getGlobalToken && getisSubscription) {

      console.log('chipote')

      LessionVisitedLogAction(GlobalHook, GlobalHook.getGlobalLessionSelect.mediaId, getStartLessonTime)

    }
  }


  if (typeof GlobalHook.getGlobalMediaVideo == "string") {
    return (
      <div className=" h-auto min-h-full w-full flex flex-col items-center py-4 justify-start">
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
        <div className=" w-full h-full px-2 md:px-4 lg:px-6 mx-auto mt-2 rounded ">

          {/* <Vimeo
            video={"115783408"}
            responsive={true}
            onEnd={IsEnd}
            loop={false}
            /> */}

          {console.log("jukie")}
          {console.log(GlobalHook.getGlobalMediaVideo)}

          {(GlobalHook.getGlobalMediaVideo != "") ?
            <div>
              <Vimeo
                video={GlobalHook.getGlobalMediaVideo}
                responsive={true}
                onEnd={IsEnd}
                loop={false}
              />
            </div>
            : <div style={{ marginTop: "20%", width: "100%", textAlign: "center", height: "40%" }}>
              <div style={{ backgroundColor: "lightgray", width: "20%", marginLeft: "40%", marginRight: "40%", paddingTop: "10px", paddingBottom: "10px" }}>
                No Video Added
                  </div>
            </div>
          }


        </div>
        <div style={{ minHeight: "30px" }} />
      </div>
    );
  }
  return <div />;
}
