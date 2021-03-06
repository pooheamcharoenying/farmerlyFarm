import React, { useState, useContext, useEffect } from "react";
import { Input, Button} from "antd";
import {FaSearch,FaBars,FaTimes} from 'react-icons/fa'
import { GlobalContext } from "../../hook/GlobalHook";

import CourseCatDropdown from "./CourseCatDropdown";
import UserDropdown from "./UserDropdown";

import LoginMobileDropdown from "./LoginMobileDropdown";

import MobileSearchBar from '../popup/MobileSearchBar'

import { courseSearchKeywordAction } from "../../actions";
export default function HeaderHome() {
  const GlobalHook = useContext(GlobalContext);
  const { Search } = Input;
  const [getSearchValue, setSearchValue] = useState("");

  useEffect(() => {
    if(getSearchValue !== ""){
  courseSearchKeywordAction(GlobalHook, getSearchValue);
    }else{
        GlobalHook.setGlobalShowSearch(false)

    }
}, [getSearchValue]);

useEffect(() => {
  if(!GlobalHook.getGlobalShowSearch){
      setSearchValue("")
  }
  }, [GlobalHook.getGlobalShowSearch])

  return (
    <>
    <div className="fixed inset-0 bg-white z-50 h-16 w-full">
      
    <div className="h-16 shadow-lg  flex flex-row justify-between items-center px-2 md:px-6 ">
    <div className="md:hidden text-2xl  justify-start flex text-gray-700 cursor-pointer" style={{flex:1}} onClick={()=>GlobalHook.setGlobalShowSideBarStatus(!GlobalHook.getGlobalShowSideBarStatus)}>
          {GlobalHook.getGlobalShowSideBarStatus?<FaTimes/>:  <FaBars />}
      
      </div>
    <a
     className="text-blue-600 flex text-3xl font-bold hover:text-blue-600 no-underline  md:flex-grow-0 flex-grow justify-center"
     href="/"
   >
        StudySabai
   </a>
   
   <div
     className=" hidden md:flex justify-end ml-10 h-full"
     style={{ flex: 1 }}
   >
     {/* <CourseCatDropdown showTitle/> */}

     {/* <Search
       placeholder="ค้นหา คอร์ส"
       onChange={value => setSearchValue(value.target.value)}
       value={getSearchValue}
       loading={getSearchValue != ""}
       className="ml-8 flex-grow-1 max-w-lg my-3"
     /> */} 
      {GlobalHook.getGlobalToken ? (
            <div className="ml-6 flex items-center">
       <UserDropdown />
       </div>
     ) : (
       <div className="ml-6 flex items-center">
         <Button onClick={() => GlobalHook.setGlobalShowLoginModal(true)}>
           Login / Signup
         </Button>
       
       </div>
     )}
     </div>

   <div className="md:hidden text-xl  justify-end flex items-center" style={{flex:1}} >

    
   {/* <div className="cursor-pointer hover:bg-gray-200 mr-4 text-gray-700" onClick={()=>GlobalHook.setGlobalShowMobileSearchBar(!GlobalHook.getGlobalShowMobileSearchBar)}><FaSearch/></div> */}

   {GlobalHook.getGlobalToken ? (
       <UserDropdown />
     ) : (
       <LoginMobileDropdown />
     )}
    
   
   </div>


      
    </div>
    {/* <MobileSearchBar/> */}
</div>


  </>
  );
}
