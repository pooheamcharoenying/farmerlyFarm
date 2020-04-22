import React, { useState, useContext, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Switch } from 'antd'
import { GlobalContext } from '../../hook/GlobalHook'

import CourseCard from '../courseCard/CourseCard'
import { UpdataCourseStatusAction } from '../../actions'
export default function MySchoolCourse() {

  const GlobalHook = useContext(GlobalContext)

  const [getcourseMatchPool, setcourseMatchPool] = useState([])

  var myCourseMatch = [];

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCoursePool[0]) {
      GlobalHook.getGlobalCoursePool.map(allCourseList =>
        GlobalHook.getGlobalUser.schoolCourse.map(subList => {

          subList.SchoolCourseList.map((item) => {
            console.log(allCourseList)
            console.log(item)
            if (allCourseList._id == item._id) {
              myCourseMatch.push(allCourseList);
              // setcourseMatchPool(myCourseMatch);
            }
          })

        })
      );

      var schoolData = GlobalHook.getGlobalSchoolPool.filter(school => school.schoolSlug == GlobalHook.getGlobalSchoolSlug)
      var schoolAllCourses = GlobalHook.getGlobalCoursePool.filter( course => course.courseSchoolId == schoolData[0]._id) 
      
      console.log("A111")
      console.log(schoolData)
      console.log(schoolAllCourses)
      console.log(myCourseMatch)

      setcourseMatchPool ( myCourseMatch.filter( course => course.courseSchoolId == schoolData[0]._id) )     
    }


  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalCoursePool]);

  return (
    <> {(getcourseMatchPool.length > 0) ?

      <div className="bg-orange-300 flex flex-col py-10 items-center">
        <div className="bg-orange-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-2" >{GlobalHook.getGlobalSchoolSlug + "School" + ": My Assigned Courses"}</div>
        <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
          {getcourseMatchPool.map((courseData, i) => <div

            key={i}
            className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
            onClick={() => window.location.href = `/course/${courseData.courseSlug}`}
          >
            <CourseCard courseData={courseData} />
          </div>)}
        </ScrollContainer>
      </div>

      : <></>}</>


  )
}
