import React,{useState,useEffect,useContext} from "react";

import { Helmet } from "react-helmet";
import { useParams} from "react-router";

import Header from "../components/header/HeaderCourse"
import SideBar from "../components/sideBar/SideBarCourse"
import CourseContent from "../components/courseContent/CourseContent"
import {getCourseContentAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
export default function Course() {
  let { courseName } = useParams();

  const GlobalHook = useContext(GlobalContext)
  
  useEffect(() => {
  
         getCourseContentAction(GlobalHook,courseName)
  
      GlobalHook.setGlobalCourseName(courseName)
    }, [])

  return (

    <div className="flex relative h-screen">
      <Helmet><title>Studysabai-Course</title></Helmet>
      <Header/>

      <SideBar />
      <CourseContent/>

     
    

</div>
  )
}
