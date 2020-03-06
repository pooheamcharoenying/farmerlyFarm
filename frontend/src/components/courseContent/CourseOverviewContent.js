import React, { useContext, useEffect, useState } from "react";
import { Input, Button } from "antd";

import { GlobalContext } from "../../hook/GlobalHook";

export default function StudioOverviewContent() {
  const GlobalHook = useContext(GlobalContext);
  const [getCourseSubscripted,setCourseSubscripted] = useState(false)


  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setCourseSubscripted(true)

          if (GlobalHook.getGlobalNotFirstLoadStatus) {

          } else {
            GlobalHook.setPrevNextStatus("Init");
            GlobalHook.setGlobalNotFirstLoadStatus(true);
            
          }
        }else{
          setCourseSubscripted(false)

        }
      });
    }
  }, );

  return (
    <div className=" w-full flex flex-col items-center py-4 justify-start">
      <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-blue-500">
        รายละเอียดคอร์ส
      </div>
      <div className="flex flex-col text-center mb-6 md:mb-8">
        <div className="font-bold text-lg mb-2">
          เรียนคอร์สนี้แล้วจะได้ะไรบ้าง
        </div>
        <div className="px-6" style={{ maxWidth: "400px" }}>
          {" "}
          {GlobalHook.getGlobalCourseInfoOverview}
        </div>
      </div>
      <div className="flex flex-col text-center mb-6 md:mb-8">
        <div className="font-bold text-lg mb-2">คอร์สนี้เหมาะสำหรับใคร</div>
        <div className="px-6" style={{ maxWidth: "400px" }}>
          {GlobalHook.getGlobalCourseInfoStudent}
        </div>
      </div>
      <div className="flex flex-col text-center mb-10 md:mb-12">
        <div className="font-bold text-lg mb-2">ข้อมูลเกี่ยวกับครูผู้สอน</div>
        <div className="px-6" style={{ maxWidth: "400px" }}>
          {GlobalHook.getGlobalCourseInfoTeacher}
        </div>
      </div>
      <button
        className="text-white bg-green-500 p-2 border-2 rounded border-green-600 hover:text-green-600 hover:bg-white"
        onClick={() => GlobalHook.setPrevNextStatus("Init")}
      >
        {getCourseSubscripted?"เรียนต่อเลย":"เริ่มเรียนเลย"}
      </button> 
      <div style={{minHeight:"60px"}}/>
      
    
    </div>
  );
}
