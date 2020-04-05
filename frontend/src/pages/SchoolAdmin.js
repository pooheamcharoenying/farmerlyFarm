import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Tag, Table, Select, Avatar } from "antd";
import Header from "../components/header/HeaderHome";

import { FindStudentBySchoolAction,SchoolStatusChangeAction,GetStudentSchoolCourseAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";

const { Option } = Select;

const { Column, ColumnGroup } = Table;
export default function Dashboard() {
  const GlobalHook = useContext(GlobalContext);
  const [getSelectedStudent, setSelectedStudent] = useState({});

  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      FindStudentBySchoolAction(
        GlobalHook,
        GlobalHook.getGlobalUser.schoolAdminId
      );
    }
  }, [GlobalHook.getGlobalUser]);

  let data = GlobalHook.getGlobalMatchStudentBySchool.map((item,index)=>{
    return{
      key:index,
      Profile: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set1",
      Name:item.userId,
      Status:item.schoolApproved ?"Approved":"Waiting",
      userId:item.userId
    }
  })
  const datae = [
    {
     
      Profile: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set1",
      Name: "Karita Brown",
      Status: "Approved"
    },
    {
     
      Profile: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set5",
      Name: "Sylvan Green",
      Status: "Waiting"
    },
    {
      
      Profile: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set3",
      Name: "Vaughn Black",
      Status: "Waiting"
    }
  ];

  const getSelectedStudentCourseData = [
    {
      key: "1",
      Cover: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set4",
      CourseName: "Karita Brown",
     
    },
    {
      key: "2",
      Cover: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set5",
      CourseName: "Sylvan Green",
 
    },
    {
      key: "3",
      Cover: "https://robohash.org/hicdoloribussunt.png?size=50x50&set=set2",
      CourseName: "Vaughn Black",
  
    }
  ];

  return (
    <>
      <Header />
      <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-green-500">
          School Admin
        </div>
        <div className="flex flex-row flex-wrap justify-around w-full bg-white p-4">
          <div className="" style={{ width: "auto" }}>
            {/* <div className="mb-4 font-semibold text-xl">
              Remaining Quota: 43
            </div> */}
            <Table
              dataSource={data}
              onRowClick={e => {
                setSelectedStudent(e);
                GetStudentSchoolCourseAction(GlobalHook,e.userId)
                console.log(e)
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
                      onClick={()=>SchoolStatusChangeAction(GlobalHook,true,record.userId)}
                    >
                      ยืนยัน
                    </a>
                    <a className="text-red-500 hover:text-red-400"
                      onClick={()=>SchoolStatusChangeAction(GlobalHook,false,record.userId)}
                    
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
                onClick={() => {}}
              >
                +
              </div>
            </div>
            <Table
              dataSource={getSelectedStudentCourseData}
            
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
                 
                    <a className="text-red-500 hover:text-red-400">ลบ</a>
                  </span>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
