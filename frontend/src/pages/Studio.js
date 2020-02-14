import React,{useState,useEffect,useContext} from "react";
import { Helmet } from "react-helmet";
import { useParams} from "react-router";
import Header from '../components/header/HeaderStudio'
import SideBar from "../components/sideBar/SideBarStudio"
import StudioContent from "../components/studioContent/StudioContent"
import {getCourseContentAction,getCoursePoolAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'

export default function Studio() {

 
    let { courseSlug } = useParams();
   
    const GlobalHook = useContext(GlobalContext)


    useEffect(() => { 
             getCourseContentAction(GlobalHook,courseSlug)
             GlobalHook.setGlobalCourseSlug(courseSlug)
             getCoursePoolAction(GlobalHook)
        }, [])

        window.onbeforeunload = function() {
          if(GlobalHook.getMutantStatus){
          return "Are you sure you want to navigate away?";
          }else{
            return
          }
        }

    
    return (
      <div className="flex relative h-screen overflow-hidden">
      <Helmet><title>Studysabai-Course</title></Helmet>
      <Header/>

      <SideBar />
      <StudioContent/>

</div>


    )
}
