import React, { useState, useContext, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Switch } from 'antd'
import { GlobalContext } from '../../hook/GlobalHook'

import CourseCard from '../courseCard/CourseCard'
import { UpdataCourseStatusAction } from '../../actions'
export default function AllSchoolCourse() {

  const GlobalHook = useContext(GlobalContext)

  const [getcourseMatchPool, setcourseMatchPool] = useState([])

  const [getSchoolData, setSchoolData] = useState([])
  const [getSchoolAllCourse, setSchoolAllCourse] = useState([])

  var myCourseMatch = [];

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCoursePool[0]) {
      console.log(' GlobalHook.getGlobalCoursePool')
      console.log( GlobalHook.getGlobalCoursePool)
      console.log('GlobalHook.getGlobalUser.schoolCourse')
      console.log(GlobalHook.getGlobalSchoolPool)



      var schoolData = GlobalHook.getGlobalSchoolPool.filter(school => school.schoolSlug == GlobalHook.getGlobalSchoolSlug)
      setSchoolData(schoolData[0])

      setSchoolAllCourse( GlobalHook.getGlobalCoursePool.filter( course => course.courseSchoolId == schoolData[0]._id) )
    
      // GlobalHook.getGlobalSchoolSlug
    }


  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalCoursePool, GlobalHook.getGlobalSchoolPool]);

  return (
    <div className="bg-green-300 flex flex-col py-10 items-center" style={{height:"100%"}} >
      {console.log('winHeight')}
      {console.log(window.innerHeight)}
      <div className="bg-green-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-2" >{GlobalHook.getGlobalSchoolSlug + ": All Courses"}</div>
      <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
        {getSchoolAllCourse.map((courseData, i) => <div

          key={i}
          className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
          onClick={() => window.location.href = `/course/${courseData.courseSlug}`}
        >
          <CourseCard courseData={courseData} />
        </div>)}
      </ScrollContainer>
    </div>


  )
}
