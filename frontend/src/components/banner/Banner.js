import React, { useState, useContext, useEffect } from "react";
import {Input} from 'antd'
import { GlobalContext } from "../../hook/GlobalHook";

export default function Banner() {
    const GlobalHook = useContext(GlobalContext);

    return (
        <div className="flex justify-center items-center flex-col" style={{height:"100vh",backgroundImage:"url(" +`https://studysabaiapp.sgp1.cdn.digitaloceanspaces.com/bg.jpg` + ")",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
        <div className="text-4xl font-bold text-white mb-6 text-center">
              Your Course to Success
              </div>
              <div className="text-xl font-bold text-white  mb-6 md:mb-10 text-center" style={{maxWidth:"300px"}}>
              Build skills with courses, certificates, and degrees online from world-class universities and companies
              </div>

              {!GlobalHook.getGlobalToken && 
              <div className="bg-blue-700 rounded-lg text-center text-white text-2xl font-bold px-4 flex items-center hover:bg-blue-600 cursor-pointer" style={{height:"40px"}} onClick={() =>{GlobalHook.setGlobalShowLoginModal(true)}}>
                  Join for Free
              </div>
            }           
         
      </div>
    )
}
