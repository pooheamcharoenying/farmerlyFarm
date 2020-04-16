import React,{useState,useContext,useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import {Switch} from 'antd'
import {GlobalContext} from '../../hook/GlobalHook'
import SchoolCard from "../courseCard/SchoolCard";

import CourseCard from '../courseCard/CourseCard'
import {UpdataCourseStatusAction} from '../../actions'
export default function SchoolCourse() {

    const GlobalHook = useContext(GlobalContext)
    
    const [getSchoolMatchPool, setSchoolMatchPool] = useState([]);

  
  
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

    return (
        <div className="bg-pink-200 flex flex-col py-10 items-center" style={{minHeight:"100vh"}}>
        <div className="bg-pink-400 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >All School</div>
        <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
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
        </ScrollContainer>
        </div>

        
    )
}
