import React,{useState,useContext,useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import {Switch} from 'antd'
import {GlobalContext} from '../../hook/GlobalHook'

import CourseCard from '../courseCard/CourseCard'
import {UpdataCourseStatusAction} from '../../actions'
export default function AdminCourse() {

    const GlobalHook = useContext(GlobalContext)
    
    const [getcourseMatchPool,setcourseMatchPool] = useState([])

    useEffect(() => {
        if(GlobalHook.getGlobalCoursePool[0]){
      
            const MatchPool = GlobalHook.getGlobalCoursePool.filter((data)=> data.courseSchool)
            setcourseMatchPool(MatchPool)
        }
    }, [GlobalHook.getGlobalCoursePool])

    return (
        <div className="bg-orange-300 flex flex-col py-10 items-center" style={{minHeight:"100vh"}}>
        <div className="bg-orange-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >School</div>
        <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
           {getcourseMatchPool.map((courseData,i) => <div
             
             key={i}
             className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
             onClick={()=>window.location.href=`/course/${courseData.courseSlug}`}
           >
             <CourseCard courseData={courseData} />
           </div>)}
        </ScrollContainer>
        </div>

        
    )
}
