import React,{useState,useEffect,useContext} from "react";
import { Helmet } from "react-helmet";

import Header from "../components/header/HeaderHome"

import {getCoursePoolAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
import AvatarSetting from '../components/settingContent/AvatarSetting'
import ProfileSetting from '../components/settingContent/ProfileSetting'
import PasswordSetting from '../components/settingContent/PasswordSetting'
import SaveBtnSetting from '../components/settingContent/SaveBtnSetting'

export default function Setting() {
const GlobalHook = useContext(GlobalContext)
  useEffect(() => {
       getCoursePoolAction(GlobalHook) 
       
  }, [])


  return (
    <>
           <Helmet><title>Studysabai</title></Helmet>
          <Header/>
          <AvatarSetting/>
          <ProfileSetting/>
          {/* <PasswordSetting/> */}
          
          {/* <SaveBtnSetting/> */}
        </>
    );
}

