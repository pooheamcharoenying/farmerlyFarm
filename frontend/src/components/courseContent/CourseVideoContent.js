import React, { useContext, useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { GlobalContext } from "../../hook/GlobalHook";

export default function CourseVideoContent() {
  const GlobalHook = useContext(GlobalContext);
  const [getVideoId, setVideoId] = useState("");
  useEffect(() => {
    if (GlobalHook.getGlobalMediaVideo != "") {
      setVideoId(GlobalHook.getGlobalMediaVideo);
    }

  }, [GlobalHook.getGlobalMediaVideo]);
  if (typeof GlobalHook.getGlobalMediaVideo == "string") {
    return (
      <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
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
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src={`https://player.vimeo.com/video/${getVideoId}?title=0&byline=0&portrait=0`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%"
                }}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
     
    );
  }
  return <div />;
}
