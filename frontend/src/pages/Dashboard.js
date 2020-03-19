import React,{useState,useEffect,useContext} from "react";
import { Helmet } from "react-helmet";

import Header from "../components/header/HeaderHome"

import {getCoursePoolAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
import AvatarSetting from '../components/settingContent/AvatarSetting'
import ProfileSetting from '../components/settingContent/ProfileSetting'
import PasswordSetting from '../components/settingContent/PasswordSetting'
import SaveBtnSetting from '../components/settingContent/SaveBtnSetting'
import RadarChart from '../components/settingContent/chart/RadarChart'

export default function Dashboard() {
const GlobalHook = useContext(GlobalContext)
  useEffect(() => {
       getCoursePoolAction(GlobalHook) 
       
  }, [])


  return (
    <>
    <Header/>
           <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
      <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
        Dashboard
      </div>

<div className="flex flex-row flex-wrap justify-around w-full">
  
  
  
    <div className="bg-gray-200 p-6 rounded-lg mb-6" style={{minHeight:"600px",width:"500px",overflowY:"auto"}}>
    <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{width:"120px",maxHeight:"500px"}}>
        Profile
      </div>
      <div className="mt-4 flex flex-col">
          <AvatarSetting/>
          <ProfileSetting/>

</div>

    </div>


    <div className="bg-gray-200 p-6 rounded-lg" style={{minHeight:"600px",width:"auto",overflowY:"auto",minWidth:"500px"}}>
    <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-blue-500 mx-auto" style={{width:"120px",maxHeight:"500px"}}>
        Statistic
      </div>
      
      <div className="mt-4 flex flex-col w-full pr-20">
      <RadarChart/>
      {/* <div style={{minHeight:"25px"}}/> */}
      {/* <RadialBarChart/> */}

        </div>

    </div>


    </div>
    </div>
         
          {/* <PasswordSetting/> */}
          
          {/* <SaveBtnSetting/> */}
        </>
    );
}

