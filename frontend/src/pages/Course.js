import React,{useState,useEffect,useContext} from "react";

import { Helmet } from "react-helmet";
import { useParams} from "react-router";

import Header from "../components/header/HeaderCourse"
import SideBar from "../components/sideBar/SideBarCourse"
import CourseContent from "../components/courseContent/CourseContent"
import {getCourseContentAction,GetCourseSettingAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
export default function Course() {
  let { courseSlug } = useParams();

  const GlobalHook = useContext(GlobalContext)
  
  useEffect(() => {
  
         getCourseContentAction(GlobalHook,courseSlug)
         GetCourseSettingAction(GlobalHook,courseSlug)
  
      GlobalHook.setGlobalCourseSlug(courseSlug)
    }, [])

  return (

    <div className="flex relative  overflow-hidden">
      <Helmet><title>Studysabai-Course</title></Helmet>
      <Header/>

      <SideBar />
      <CourseContent/>

     
    

</div>
  )
}
