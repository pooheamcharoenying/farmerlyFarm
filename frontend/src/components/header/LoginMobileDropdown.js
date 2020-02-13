import React, { useState, useContext, useEffect } from "react";

import {Menu, Dropdown,Avatar} from "antd";

import {
    FaTh,
    FaCalculator,
    FaAtom,
    FaRobot,
    FaCode,
    FaPowerOff,
    FaUserLock
  } from "react-icons/fa";
import { GlobalContext } from "../../hook/GlobalHook";
  
const LoginMobileDropdown = () => {
  const GlobalHook = useContext(GlobalContext);

    return (
 
     <button className="flex justify-center items-center hover:bg-gray-200 text-2xl text-gray-700 " onClick={() => GlobalHook.setGlobalShowLoginModal(true)}>
        <FaUserLock  />
        
      </button> 
  
  
    );
}

export default LoginMobileDropdown;
