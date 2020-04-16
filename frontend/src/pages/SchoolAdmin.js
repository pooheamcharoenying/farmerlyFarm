import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Modal, Table, Select, Avatar ,message} from "antd";
import Header from "../components/header/HeaderHome";

import {getSchoolInfoByIdAction, FindStudentBySchoolAction,SchoolStatusChangeAction,GetStudentSchoolCourseAction,getmatchschoolcourseAction,AssignCourseToUserAction,DelCourseToUserAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";

const { Option } = Select;

const { Column, ColumnGroup } = Table;
export default function Dashboard() {
  const GlobalHook = useContext(GlobalContext);
  const [getSelectedStudent, setSelectedStudent] = useState(null);
  const [getModalAddMyNewCourseOpenStatus,setModalAddMyNewCourseOpenStatus] = useState(false)
  const [getLocalMatchCourseSchool,setLocalMatchCourseSchool] = useState([])
  const [getLocalMatchStudentCourseSchool,setLocalMatchStudentCourseSchool] = useState([])
  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      FindStudentBySchoolAction(
        GlobalHook,
        GlobalHook.getGlobalUser.schoolAdminId
      );
      getmatchschoolcourseAction(GlobalHook, GlobalHook.getGlobalUser.schoolAdminId)

      getSchoolInfoByIdAction(GlobalHook,GlobalHook.getGlobalUser.schoolAdminId)

    }
  }, [GlobalHook.getGlobalUser]);
//getGlobalMatchStudentCourseSchool
  let data = GlobalHook.getGlobalMatchStudentBySchool.map((item,index)=>{
    return{
      key:index,
      Profile: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set1",
      Name:item.userId,
      Status:item.schoolApproved ?"Approved":"Waiting",
      userId:item.userId,
      schoolApproved:item.schoolApproved
    }
  })

  // let getSelectedStudentCourseData = GlobalHook.getGlobalMatchStudentCourseSchool.SchoolCourseList.map((item,index)=>{
  //   return{
  //     key:index,
  //     Cover: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set5",
  //     CourseName:item
  //   }
  // })



  useEffect(() => {
    if(GlobalHook.getGlobalMatchCourseSchool){

      setLocalMatchCourseSchool(GlobalHook.getGlobalMatchCourseSchool.map((item,index)=>{
        return{
          key:index,
          Cover: item.courseImage,
          CourseName:item.courseName,
          courseId:item._id
        }
    }))
  }
  }, [GlobalHook.getGlobalMatchCourseSchool])


  useEffect(() => {
    if(GlobalHook.getGlobalMatchStudentCourseSchool){

      setLocalMatchStudentCourseSchool(GlobalHook.getGlobalMatchStudentCourseSchool.map((item,index)=>{
        console.log(item)
        return{
          key:index,
          Cover: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set4",
          CourseName:item._id,
          courseId:item._id
        }
    }))
  }
  }, [GlobalHook.getGlobalMatchStudentCourseSchool])

  function RenderAddMyNewCourseModal() {
    return (
      <Modal
        visible={getModalAddMyNewCourseOpenStatus}
        title="Add School Course"
        onOk={() => setModalAddMyNewCourseOpenStatus(false)}
        onCancel={() => {
          setModalAddMyNewCourseOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            
          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="flex mb-4">
          <Table
              dataSource={getLocalMatchCourseSchool}
            
              className="mt-4"
            >
              <Column
                title="Cover"
                dataIndex="Cover"
                key="Cover"
                className="cursor-pointer"
                render={Cover => <Avatar size={40} src={Cover} />}
              />
              <Column
                title="CourseName"
                dataIndex="CourseName"
                key="CourseName"
                className="cursor-pointer"
              />

          
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <div
                  className="ml-2 bg-green-500 hover:bg-green-400 cursor-pointer p-2 rounded-full flex justify-center items-center text-white"
                  style={{ width: "20px", height: "20px" }}
                  onClick={() => {setModalAddMyNewCourseOpenStatus(false);
                    AssignCourseToUserAction(GlobalHook,getSelectedStudent.userId,GlobalHook.getGlobalUser.schoolAdminId,record.courseId)
                  }}
                >
                  +
                </div>
                )}
              />
            </Table>
          </div>
        </div>
      </Modal>
    );
  }



  return (
    <>
    {RenderAddMyNewCourseModal()}
      <Header />
      <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-green-500">
  School Admin: {" "} {GlobalHook.getGlobalSchoolInfo.schoolName}
        </div>
        <div className="flex flex-row flex-wrap justify-around w-full bg-white p-4">
          <div className="" style={{ width: "auto" }}>
            <div className="mb-4 font-semibold text-xl">
              Remaining Quota: {GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota}
            </div>
            <Table
              dataSource={data}
              onRowClick={e => {
                if(e.schoolApproved){
                  setSelectedStudent(e);
                  GetStudentSchoolCourseAction(GlobalHook,e.userId)
                  console.log(e)
                }else{
                message.warning("Not Approved")
                }
                
              }}
            >
              <Column
                title="Profile"
                dataIndex="Profile"
                key="Profile"
                className="cursor-pointer"
                render={Profile => <Avatar size={40} src={Profile} />}
              />
              <Column
                title="Name"
                dataIndex="Name"
                key="Name"
                className="cursor-pointer"
              />

              <Column
                title="Status"
                dataIndex="Status"
                key="Status"
                className="cursor-pointer"
              />

              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <a
                      className="text-green-500 hover:text-green-400"
                      style={{ marginRight: 16 }}
                      onClick={()=>{
                        if((GlobalHook.getGlobalSchoolInfo.schoolMaxQuota >= GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota)&&record.Status == "Waiting"){
                          SchoolStatusChangeAction(GlobalHook,true,record.userId)

                        }else{
                          message.error("Error Approve")
                        }
                      
                      }}
                    >
                      ยืนยัน
                    </a>
                    <a className="text-red-500 hover:text-red-400"
                      onClick={()=>{
                        if((GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota >0)&&record.Status == "Approved"){  
                        SchoolStatusChangeAction(GlobalHook,false,record.userId)
                        }else{
                          message.error("Error Cancel")

                        }
                      }}
                    
                    >ยกเลิก</a>
                  </span>
                )}
              />
            </Table>
          </div>
          <div
            className=" flex flex-col p-2"
            style={{ width: "500px" }}
          >
           {getSelectedStudent && <>
            <div className="bg-yellow-400 flex justify-around items-center">
              <Avatar
                size={40}
                className="cursor-pointer"
                src={getSelectedStudent.Profile}
              />
              <div>{getSelectedStudent.Name}</div>
              <div>{getSelectedStudent.Status}</div>
            </div>
            <div className="flex mt-4">
              <div>Assigned Course:</div>

              <div
                className="ml-2 bg-orange-500 hover:bg-orange-400 cursor-pointer p-2 rounded-full flex justify-center items-center text-white"
                style={{ width: "20px", height: "20px" }}
                onClick={() => {setModalAddMyNewCourseOpenStatus(true)}}
              >
                +
              </div>
            </div>
            <Table
              dataSource={getLocalMatchStudentCourseSchool}
            
              className="mt-4"
            >
              <Column
                title="Cover"
                dataIndex="Cover"
                key="Cover"
                className="cursor-pointer"
                render={Cover => <Avatar size={40} src={Cover} />}
              />
              <Column
                title="CourseName"
                dataIndex="CourseName"
                key="CourseName"
                className="cursor-pointer"
              />

          
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                 
                    <a className="text-red-500 hover:text-red-400"
                    onClick={()=>{
                      DelCourseToUserAction(GlobalHook,getSelectedStudent.userId,GlobalHook.getGlobalUser.schoolAdminId,record.courseId)
                    }}
                    >ลบ</a>
                  </span>
                )}
              />
            </Table>
            </>
            }
          </div>
        </div>
      </div>
    </>
  );
}


