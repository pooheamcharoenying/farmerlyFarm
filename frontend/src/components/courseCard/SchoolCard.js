import React from 'react'
import {Icon} from 'antd';
export default function SchoolCard({schoolData}) {
    const schoolDataLocal = schoolData || []
    return (
        <div style={{minWidth:"200px",maxWidth:"200px",maxHeight:"360px",minHeight:"360px"}} className="bg-white flex flex-col shadow-lg rounded-lg relative ">
        <div className="bg-gray-500 absolute inset-0 opacity-0 hover:opacity-25 cursor-pointer"></div>
        <img className="w-full object-cover rounded-lg rounded-b-none" alt={schoolDataLocal.schoolName} style={{minHeight:"260px",maxHeight:"260px"}} src={schoolDataLocal.schoolImage || "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"}/>
        <div style={{height:"10px"}}></div>
        <div className="text-center text-2xl mt-2 font-bold text-gray-900 px-2 capitalize text2line flex justify-center items-center" style={{minHeight:"60px",maxHeight:"60px"}}>
           {schoolDataLocal.schoolName + " School" || ""}
        </div>
        {/* <div className="text-center text-2xl mt-2 font-bold text-gray-900 px-2 capitalize text2line flex justify-center items-center" style={{minHeight:"60px",maxHeight:"60px"}}>
           School
        </div> */}
        
        
    </div>
      
    )
}
