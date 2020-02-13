import React from 'react'
import {Icon} from 'antd';
export default function CourseCard({courseData}) {
    const courseDataLocal = courseData || []
    return (
        <div style={{minWidth:"200px",maxWidth:"200px"}} className="bg-white flex flex-col shadow-lg rounded-lg relative ">
        <div className="bg-gray-500 absolute inset-0 opacity-0 hover:opacity-25 cursor-pointer"></div>

            <img className="w-full object-cover rounded-lg rounded-b-none" alt={courseDataLocal.courseName} style={{height:"180px"}} src={courseDataLocal.courseImage || ""}/>
        <div className="text-xl mt-2 font-bold text-gray-900 px-2  capitalize">
           {courseDataLocal.courseName || ""}
        </div>
        <div className="px-2 mt-2 truncate ">
        {courseDataLocal.courseDescription || ""}
        </div>
        <div className="px-2 mt-2 flex items-center truncate">
        <Icon type="user" /><div className="truncate ml-1">{courseDataLocal.courseTeacher || ""}</div> 
        </div>
        <div className="flex justify-between px-2 my-2">
            <div className="flex items-center truncate"><Icon type="stock" /><div className="truncate ml-1">{courseDataLocal.courseLevel || ""}</div> </div>
            <div className="flex items-center truncate"><Icon type="wallet" /><div className="truncate ml-1">{courseDataLocal.courseSubject || ""}</div> </div>
        </div>
        
</div>
      
    )
}
