import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Modal, Input, Select, Table, Column } from "antd";
import Header from "../components/header/HeaderHome";

import { getCoursePoolAction,CreateTeacherPaymentAction,getSchoolPoolAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
import AvatarSetting from "../components/settingContent/AvatarSetting";
import ProfileSetting from "../components/settingContent/ProfileSetting";
import PasswordSetting from "../components/settingContent/PasswordSetting";
import SaveBtnSetting from "../components/settingContent/SaveBtnSetting";
import RadarChart from "../components/settingContent/chart/RadarChart";
import MySchool from '../components/mySchool/MySchool'
const { Option } = Select;
export default function Dashboard() {
  const GlobalHook = useContext(GlobalContext);
  const [
    getSetupTeacherPaymentModalOpenStatus,
    setSetupTeacherPaymentModalOpenStatus
  ] = useState(false);
  useEffect(() => {
    getCoursePoolAction(GlobalHook);
    getSchoolPoolAction(GlobalHook);
  }, []);

  const [getEmail, setEmail] = useState("")
  const [getName, setName] = useState("")
  const [getrpid, setrpid] = useState(null)



  useEffect(() => {
    if (GlobalHook.getGlobalCurrentUser) {
      setName(GlobalHook.getGlobalCurrentUser.displayName)

      setEmail(GlobalHook.getGlobalCurrentUser.email)
      setrpid(GlobalHook.getGlobalCurrentUser.rpid)

    }
  }, [GlobalHook.getGlobalCurrentUser]);

  function onChange(value) {
    GlobalHook.setGlobalTeacherPayment_AccountBank(value)
  }


  function SetupTeacherPaymentModal() {
    return (
      <Modal
        visible={getSetupTeacherPaymentModalOpenStatus}
        onOk={() => setSetupTeacherPaymentModalOpenStatus(false)}
        onCancel={() => {
          setSetupTeacherPaymentModalOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setSetupTeacherPaymentModalOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>

            <button
              onClick={() => {
                setSetupTeacherPaymentModalOpenStatus(false);
                CreateTeacherPaymentAction(GlobalHook,getName,getEmail,getrpid)
               
              }}
              className="bg-yellow-400 text-black p-2 rounded hover:bg-yellow-300"
            >
              Save
            </button>
          </div>
        ]}
      >
        <div>
          <div className="mt-2">Payment</div>

          <Input className="mt-2" placeholder="Account Holder Name" value={GlobalHook.getGlobalTeacherPayment_AccountHolderName} onChange={(e)=>{GlobalHook.setGlobalTeacherPayment_AccountHolderName(e.target.value)}}/>
          <Input className="mt-2" placeholder="Account Number" value={GlobalHook.getGlobalTeacherPayment_AccountNumber}  onChange={(e)=>{GlobalHook.setGlobalTeacherPayment_AccountNumber(e.target.value)}}/>
          <Select
            showSearch
            className="mt-2"
            style={{ width: 200 }}
            placeholder="Select Bank"
            optionFilterProp="children"
            onChange={onChange}
            value={GlobalHook.getGlobalTeacherPayment_AccountBank}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="bbl">Bangkok Bank</Option>
            <Option value="kbank">Kasikorn Bank</Option>
            <Option value="tmb">TMB Bank</Option>
          </Select>
        </div>
      </Modal>
    );
  }

  return (
    <>
      {SetupTeacherPaymentModal()}
      <Header />
      <div className=" h-full w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
          Dashboard
        </div>

        <div className="flex flex-row flex-wrap justify-around w-full">
          <div
            className="bg-gray-200 p-6 rounded-lg mb-6"
            style={{ minHeight: "600px", width: "500px", overflowY: "auto" }}
          >
            <div
              className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto"
              style={{ width: "120px", maxHeight: "500px" }}
            >
              Profile
            </div>
            <div className="mt-4 flex flex-col">
              <AvatarSetting />
              <ProfileSetting />
           
            </div>

            <div className="mt-4 flex flex-col">
            <div
                className="rounded-lg text-center text-black py-2  font-bold bg-yellow-400 hover:bg-yellow-300 mx-auto cursor-pointer"
                style={{ width: "250px", maxHeight: "500px" }}
                onClick={() => setSetupTeacherPaymentModalOpenStatus(true)}
              >
                Setup Teacher Payment
              </div>
              </div>

            <MySchool/>

            {/* <Table
              dataSource={getStudentList}
              onRowClick={e => {
                if (e.schoolApproved) {
                  setSelectedStudent(e);

                  GetStudentSchoolCourseAction(GlobalHook, e.uid, getLocalMatchCourseSchool)
                  console.log('tableClick')
                  console.log(e)
                } else {
                  message.warning("Not Approved")
                }

              }}
            >
              <Column
                title="Profile"
                dataIndex="profile"
                key="Profile"
                className="cursor-pointer"
                render={Profile => <Avatar size={40} src={Profile} />}
              />
              <Column
                title="Name"
                dataIndex="name"
                key="Name"
                className="cursor-pointer"
              />

              <Column
                title="Status"
                dataIndex="status"
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
                      onClick={() => {
                        console.log('stussy')
                        console.log(record.status)
                        if ((GlobalHook.getGlobalSchoolInfo.schoolMaxQuota >= GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota) && record.status == "Waiting") {
                          SchoolStatusChangeAction(GlobalHook, true, record.uid)

                        } else {
                          message.warning("User is already registerd to school.")
                        }

                      }}
                    >
                      ยืนยัน
                    </a>
                    <a className="text-red-500 hover:text-red-400"
                      onClick={() => {
                        console.log('stacy')
                        console.log(record.status)
                        if ((GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota > 0) && record.status == "Approved") {
                          SchoolStatusChangeAction(GlobalHook, false, record.uid)
                        } else {
                          message.error("Error Cancel")
                        }
                      }}

                    >ยกเลิก</a>
                  </span>
                )}
              />
            </Table> */}



















            {/* <div className="mt-8 flex flex-col bg-white rounded-lg p-2">
            <div
              className="rounded-lg text-center text-white py-2 text-xl font-bold bg-green-500 mx-auto"
              style={{ width: "120px", maxHeight: "500px" }}
            >
              MySchool
            </div>

            <div
              className="rounded-full text-center text-white  text-3xl font-bold bg-orange-500 hover:bg-orange-400 mx-auto mt-4 cursor-pointer flex justify-center items-center"
              style={{ width: "40px", height: "40px" }}
            >
              +
            </div>

            <select
              id="subject"
              
            >
              {[1,2,3,4].map(item => {
                return <option value={item}>{item}</option>;
              })}
            </select>

            </div> */}
          </div>






          {/* <div
            className="bg-gray-200 p-6 rounded-lg"
            style={{
              minHeight: "600px",
              width: "auto",
              overflowY: "auto",
              minWidth: "500px"
            }}
          >
            <div
              className="rounded-lg text-center text-white py-2 text-xl font-bold bg-blue-500 mx-auto"
              style={{ width: "120px", maxHeight: "500px" }}
            >
              Statistic
            </div>

            <div className="mt-4 flex flex-col w-full pr-20">
              <RadarChart />
              <div style={{minHeight:"25px"}}/> 
               <RadialBarChart/>
            </div>
          </div> */}


          
        </div>
      </div>

      {/* <PasswordSetting/> */}

      {/* <SaveBtnSetting/> */}
    </>
  );
}
