import React,{useContext,useEffect,useState} from 'react'
import {Modal,Switch,Icon} from 'antd'
import CourseSetting from '../courseSetting/courseSetting'
import {GlobalContext} from "../../hook/GlobalHook"
import Drag from '../drag/MainDragStudio'

import {UpdataCoursepublishAction} from '../../actions'

export default function SideBarCourse() {
    const GlobalHook = useContext(GlobalContext)

    const [getUnSaveAlertStatus,setUnSaveAlertStatus] = useState(false)
    const [getCoursePublishStatus,setCoursePublishStatus] = useState(false)

    
    useEffect(() => {
      if(GlobalHook.getGlobalCoursePool[0] &&GlobalHook.getGlobalcourseId ){

      
     const matchPool = GlobalHook.getGlobalCoursePool.filter((data)=>data._id == GlobalHook.getGlobalcourseId)
     if(matchPool){
      setCoursePublishStatus(matchPool[0].coursePublish)
     }
      }
    }, [GlobalHook.getGlobalcourseId,GlobalHook.getGlobalCoursePool])

    function RenderUnSaveAlert(){

      return(
       
          <Modal
      visible={getUnSaveAlertStatus}
      title="UnSaveAlert"
      onOk={() => setUnSaveAlertStatus(false)}
      onCancel={() => {
        setUnSaveAlertStatus(false);
      }}
      footer={[
        <div className="w-full flex justify-center">
           <button
            onClick={() =>{
              
              setUnSaveAlertStatus(false);
              GlobalHook.setMutantStatus(false);
              GlobalHook.setGlobalLessionSelect({"mediaType":"Overview"});
              GlobalHook.setGlobalShowSideBarStatus(false);
              GlobalHook.setGlobalCourseStructure(JSON.parse(localStorage.getItem("InitStructure")))

            }}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
          >
            Leave
          </button>
        
          <button
            onClick={() => {setUnSaveAlertStatus(false)}}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
          >
            cancel
          </button>
  
  
          
        </div>
      ]}
    >
      Changes that you made may not be saved.
  
    </Modal> 
      )
    }

    function handleUnSaveCheck(){
      if(GlobalHook.getMutantStatus){
      setUnSaveAlertStatus(true)


      }else{
        GlobalHook.setGlobalLessionSelect({"mediaType":"Overview"})
        GlobalHook.setGlobalShowSideBarStatus(false);
        
      }
    }

    function renderPublishSwitch(){
      let publishStatus =false

      if(GlobalHook.getGlobalCoursePool[0] &&GlobalHook.getGlobalcourseId ){

      
        const matchPool = GlobalHook.getGlobalCoursePool.filter((data)=>data._id == GlobalHook.getGlobalcourseId)
        if(matchPool){
          publishStatus = matchPool[0].coursePublish
        
        return(
          <Switch defaultChecked={publishStatus} checkedChildren="Yes" unCheckedChildren="No" onClick={(coursePublish)=>UpdataCoursepublishAction(GlobalHook,GlobalHook.getGlobalCourseSlug,coursePublish)}/>
        )
        }

         }
         

      
    }

    return (
      <>
      {RenderUnSaveAlert()}
      <div
        className=" bg-gray-300 w-10/12 md:w-5/12 pb-64 xl:w-3/12 mt-16 fixed md:relative top-0 left-0  flex-col z-30 hidden md:flex"
        style={{
          display: GlobalHook.getGlobalShowSideBarStatus ? "flex" : "",
          overflowY: "scroll",
          maxHeight:"100vh"
          
        }}
      >
        <div
          className="bg-blue-300 flex flex-col px-6 w-full "
          style={{ minHeight: "150px" }}
        >
          <div
            className="bg-white rounded my-4 text-center shadow-lg  text-lg truncate"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            {"คอร์ส: " + GlobalHook.getGlobalCourseName}
          </div>

          <div
            className="bg-white rounded mb-4 text-center shadow-lg px-4 flex items-center justify-center"
            style={{ paddingTop: "12px", paddingBottom: "12px" }}
          >
             <div className="mr-2">Setting :</div><CourseSetting/>
            <div> Publish:</div>
           
           <div  className="ml-2">{renderPublishSwitch()}</div>
          
          </div>
        
        </div>
  
        <div
          className="bg-blue-500 hover:bg-blue-400 rounded my-4 text-center shadow-lg text-white text-lg mx-2 cursor-pointer"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          onClick={() => {
            handleUnSaveCheck()
          }}
        >
          รายละเอียดคอร์ส
        </div>
  
        <div
          className="bg-orange-500 hover:bg-orange-400 rounded mb-4 text-center shadow-lg text-white text-lg mx-2 cursor-pointer"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          onClick={() => {
            GlobalHook.setGlobalLessionSelect({ mediaType: "Statistic" });
            GlobalHook.setGlobalShowSideBarStatus(false);
          }}
        >
          Statistic
        </div>
  
        <Drag />
        <div style={{minHeight:"60px"}}></div>
      </div>
      </>
    
    );

   
}
