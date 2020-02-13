
import React,{useState,useContext,useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import {Switch,Icon} from 'antd'
import {GlobalContext} from '../../hook/GlobalHook'

import CourseCard from '../courseCard/CourseCard'
import {UpdataCoursepublishAction} from '../../actions'

export default function TeacherCourse() {

    const GlobalHook = useContext(GlobalContext)

    const [getcourseMatchPool,setcourseMatchPool] = useState([])
    var myCourseMatch = [];

useEffect(() => {
    if(GlobalHook.getGlobalUser && GlobalHook.getGlobalCoursePool[0]){
    GlobalHook.getGlobalUser.TeacherCourse.map(subList =>
        GlobalHook.getGlobalCoursePool.map(allCourseList => {
        if (allCourseList.courseName == subList.courseName) {
          myCourseMatch.push(allCourseList);
          setcourseMatchPool(myCourseMatch)
        }
      })
    );
    }
}, [GlobalHook.getGlobalUser,GlobalHook.getGlobalCoursePool])

    return (
        <div className="bg-blue-300 flex flex-col py-10 items-center" style={{minHeight:"500px"}}>
        <div className="bg-blue-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >คอร์สที่ฉันสร้าง</div>
        <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
           {getcourseMatchPool.map((courseData,i) => <div key={i} className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center flex-col "  >
           <div className="bg-white flex justify-center rounded-lg py-4 -mb-2 items-center" style={{width:"200px"}}><Icon className="text-bold mr-2 cursor-pointer" type="setting" onClick={()=>alert("setting")}/><div className="text-bold mr-2">Publish</div> <Switch defaultChecked={courseData.coursePublish} checkedChildren="Yes" unCheckedChildren="No" onClick={(coursePublish)=>UpdataCoursepublishAction(GlobalHook,courseData.courseName,coursePublish)}/></div>
           <div onClick={()=>window.location.href=`/teacher/${courseData.courseName}`}>
          
           <CourseCard courseData={courseData} />
                
           </div>
           </div>)}
        </ScrollContainer>
        </div>

        
    )
}
