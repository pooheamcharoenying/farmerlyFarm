import React, { useContext, useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import ReactQuill from "react-quill";
// import TextEditorComp from '../textEditor/TextEditorCompCourse'

import { GlobalContext } from "../../hook/GlobalHook";

export default function CourseDocumentContent() {
  const GlobalHook = useContext(GlobalContext);

  const [getEditorData, setEditorData] = useState("");
  
  const [getisSubscription, setisSubscription] = useState(false);

  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    }
  }, [GlobalHook.getGlobalUser,GlobalHook.getGlobalcourseId]);

  useEffect(() => {
    if (typeof GlobalHook.getGlobalMediaDocument == "string") {
      setEditorData(GlobalHook.getGlobalMediaDocument);
    }
  }, [GlobalHook.getGlobalMediaDocument]);

  return (
    <div className="min-h-full h-auto w-full flex flex-col items-center justify-start py-4">
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
      <div className=" w-full min-h-full px-2 md:px-4 lg:px-6 mx-auto my-4 rounded">
        <ReactQuill
          value={getEditorData || ""}
          theme="snow"
          className="hide-toolbar"
          readOnly
        />
      </div>
      <div style={{minHeight:"50px"}}/>
       

    
    </div>


  );
}
