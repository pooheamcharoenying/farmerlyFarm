import React,{useState,useContext,useEffect} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import {Switch} from 'antd'
import {GlobalContext} from '../../hook/GlobalHook'

import CourseCard from '../courseCard/CourseCard'
import {UpdataCourseStatusAction} from '../../actions'
export default function SchoolCourse() {

    const GlobalHook = useContext(GlobalContext)
 

    return (
        <div className="bg-green-200 flex flex-col py-10 items-center" style={{minHeight:"100vh"}}>
        <div className="bg-green-400 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >คุณถูกเชิญให้เข้าร่วมโรงเรียน:{" "}{GlobalHook.getGlobalSchoolSlug}</div>
            <div className="mt-8 text-3xl">คุณต้องการที่จะเข้าร่วมหรือไม่ ?</div>

            <div className="flex mt-4 text-xl">
                <div className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg text-white cursor-pointer">เข้าร่วม</div>
                <div className="bg-red-500 hover:bg-red-400 p-2 rounded-lg text-white ml-2 cursor-pointer" onClick={()=>window.location.href="/"}>ปฏิเสธ</div>
                </div>
        </div>

        
    )
}
