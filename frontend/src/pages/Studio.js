import React,{useState,useEffect,useContext} from "react";
import { Helmet } from "react-helmet";
import { useParams} from "react-router";
import Header from '../components/header/HeaderStudio'
import SideBar from "../components/sideBar/SideBarStudio"
import StudioContent from "../components/studioContent/StudioContent"
import {getCourseContentAction,getCoursePoolAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
// import {Prompt} from 'react-router-dom'
// import UnSaveAlert from '../components/popup/unSaveAlert'
export default function Studio() {

 
    let { courseName } = useParams();
   
    const GlobalHook = useContext(GlobalContext)


    useEffect(() => { 
             getCourseContentAction(GlobalHook,courseName)
             GlobalHook.setGlobalCourseName(courseName)
             console.log(courseName)
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

      //   <div className="h-screen flex flex-col">
      //       {/* <Prompt
      //       when={GlobalHook.getMutantStatus}
      //       message={location => ` Changes that you made may not be saved. Are you sure you want to leave this page ?`}
      //     /> */}
      //    <Helmet><title>Studysabai:{courseName}</title></Helmet>
      //    <Header/>
        
      //    <div className="fixed inset-0 bg-yellow-400 mt-16 flex">
      //       <SideBar />
      //       <StudioContent/>

      // </div>
      //   </div>
    )
}
