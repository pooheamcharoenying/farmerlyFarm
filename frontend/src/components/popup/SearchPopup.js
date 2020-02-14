import React, { useContext } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Spin, Icon } from 'antd';

import CourseCard from "../courseCard/CourseCard";
import { GlobalContext } from "../../hook/GlobalHook";
//GlobalHook.getGlobalShowSearch
export default function SearchPopup() {
  const GlobalHook = useContext(GlobalContext);
  const antIcon = <Icon type="loading" style={{ fontSize: 24,color:"black" }} spin />;

  if (GlobalHook.getGlobalShowSearch) {
    return (
      <div className="fixed inset-0 bg-gray-200 flex flex-col items-center pt-16 z-40 mt-16">
        <div className="flex w-full justify-between px-10 text-lg mb-4">
    <div className="text-2xl font-bold">Found{" "}{GlobalHook.getGlobalCourseSearch.filter((item)=>item.courseActive).length}{" "}results{" "} <Spin indicator={antIcon} /></div>
          <button className="text-2xl" onClick={()=>{GlobalHook.setGlobalShowMobileSearchBar(false);GlobalHook.setGlobalShowSearch(false);}}>
            X
          </button>
        </div>

        <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
           {GlobalHook.getGlobalCourseSearch.map((courseData,i) => <div style={{display:courseData.courseActive?"":"none"}} key={i} className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center" onClick={()=>window.location.href=`/course/${courseData.courseSlug}`}><CourseCard courseData={courseData}/></div>)}
        </ScrollContainer>
      </div>
    );
  }
  return <div></div>;
}
