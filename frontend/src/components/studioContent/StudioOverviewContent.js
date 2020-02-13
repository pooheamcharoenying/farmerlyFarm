import React,{useContext,useEffect,useState} from 'react'
import { Input,Button } from 'antd';

import {GlobalContext} from '../../hook/GlobalHook'
import {CheckMutateAction} from "../../actions"

const { TextArea } = Input;
export default function StudioOverviewContent() {
    const GlobalHook = useContext(GlobalContext)

    const [getCourseInfoOverview,setCourseInfoOverview] = useState("")
    const [getCourseInfoStudent,setCourseInfoStudent] = useState("")
    const [getCourseInfoTeacher,setCourseInfoTeacher] = useState("")

    const [getInitStateCourseInfoOverview,setInitStateCourseInfoOverview] = useState("")
    const [getInitStateCourseInfoStudent,setInitStateCourseInfoStudent] = useState("")
    const [getInitStateCourseInfoTeacher,setInitStateCourseInfoTeacher] = useState("")


    // useEffect(() => {
    //     if(getInitStateCourseInfoOverview != ""){
    //         setInitStateCourseInfoOverview(GlobalHook.getGlobalCourseInfoOverview)

    //     }
    // }, [GlobalHook.getGlobalCourseInfoOverview])

    // useEffect(() => {
    //     CheckMutateAction(GlobalHook,getInitStateCourseInfoOverview,GlobalHook.getGlobalCourseInfoOverview)
    // }, [GlobalHook.getGlobalCourseInfoOverview])

//Overview
    useEffect(() => {
        setCourseInfoOverview(GlobalHook.getGlobalCourseInfoOverview)
        setInitStateCourseInfoOverview(GlobalHook.getGlobalCourseInfoOverview)

    }, [GlobalHook.getGlobalCourseInfoOverview])

    useEffect(() => {
        GlobalHook.setGlobalCourseInfoOverviewNew(getCourseInfoOverview)
       CheckMutateAction(GlobalHook,getInitStateCourseInfoOverview,getCourseInfoOverview)
    }, [getCourseInfoOverview])

    //Student
    useEffect(() => {
        setCourseInfoStudent(GlobalHook.getGlobalCourseInfoStudent)
        setInitStateCourseInfoStudent(GlobalHook.getGlobalCourseInfoStudent)

    }, [GlobalHook.getGlobalCourseInfoStudent])

    useEffect(() => {
        GlobalHook.setGlobalCourseInfoStudentNew(getCourseInfoStudent)
        CheckMutateAction(GlobalHook,getInitStateCourseInfoStudent,getCourseInfoStudent)
    }, [getCourseInfoStudent])


     //Teacher
     useEffect(() => {
        setCourseInfoTeacher(GlobalHook.getGlobalCourseInfoTeacher)
        setInitStateCourseInfoTeacher(GlobalHook.getGlobalCourseInfoTeacher)

    }, [GlobalHook.getGlobalCourseInfoTeacher])

    useEffect(() => {
        GlobalHook.setGlobalCourseInfoTeacherNew(getCourseInfoTeacher)
        CheckMutateAction(GlobalHook,getInitStateCourseInfoTeacher,getCourseInfoTeacher)

    }, [getCourseInfoTeacher])
 

 
        return (
            <div className=" h-full w-full flex flex-col items-center pt-4 overflow-hidden">
                <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-2 bg-blue-500">รายละเอียดคอร์ส</div>
                <div className="flex flex-col overflow-y-auto  h-full w-full over items-center justify-start">
                   <div className="flex flex-col text-center mt-6 mb-6">
                   <div className="font-bold text-lg mb-2 ">เรียนคอร์สนี้แล้วจะได้ะไรบ้าง</div>
                   <TextArea   autoSize={{ minRows: 2, maxRows: 6 }} value={getCourseInfoOverview} onChange={(e)=>{setCourseInfoOverview(e.target.value)}}/>
                   </div>
    
                   <div className="flex flex-col text-center mb-6">
                   <div className="font-bold text-lg mb-2">คอร์สนี้เหมาะสำหรับใคร</div>
                   <TextArea   autoSize={{ minRows: 2, maxRows: 6 }} value={getCourseInfoStudent} onChange={(e)=>{setCourseInfoStudent(e.target.value)}}/>

    
                   </div>
    
                   <div className="flex flex-col text-center mb-6">
                   <div className="font-bold text-lg mb-2">ข้อมูลเกี่ยวกับครูผู้สอน</div>
                   <TextArea  autoSize={{ minRows: 2, maxRows: 6 }} value={getCourseInfoTeacher} onChange={(e)=>{setCourseInfoTeacher(e.target.value)}}/>
    
                   </div>

                   <div className="flex flex-col text-center mb-6">
                   <div className="font-bold text-lg mb-2">TAG</div>
                   <TextArea  autoSize={{ minRows: 2, maxRows: 6 }} value={getCourseInfoTeacher} onChange={(e)=>{}}/>
    
                   </div>
    
                </div>
          
           
            </div>
        )
      

}
