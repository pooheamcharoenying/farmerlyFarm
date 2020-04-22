import React, { useState, useContext, useEffect } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { FaUserCheck, FaWindowClose } from "react-icons/fa";

import { Modal, Avatar, Tooltip } from "antd";

import { GlobalContext } from "../../hook/GlobalHook";
import { AddMyNewSchoolAction, RemoveMySchoolAction } from "../../actions";
export default function MySchool() {
  const GlobalHook = useContext(GlobalContext);
  const [getMatchSchool, setMatchSchool] = useState([]);
  const [getNotMatchSchool, setNotMatchSchool] = useState([]);

  const [
    getModalAddMyNewSchoolOpenStatus,
    setModalAddMyNewSchoolOpenStatus
  ] = useState(false);
  const [getSelectedMySchool, setSelectedMySchool] = useState("");

  var mySchoolMatch = [];
  var SchoolNotMatch = [];

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalSchoolPool[0]) {

      console.log('schoolPool')
      console.log(GlobalHook.getGlobalSchoolPool)
      console.log(GlobalHook.getGlobalUser)

      SchoolNotMatch = GlobalHook.getGlobalSchoolPool
      GlobalHook.getGlobalSchoolPool.map((allSchoolList) => {
        if (GlobalHook.getGlobalUser.schoolCourse[0]) {
          GlobalHook.getGlobalUser.schoolCourse.map(subList => {
            if (allSchoolList._id == subList.schoolId) {
              console.log('allSchoolList')
              console.log(allSchoolList)
              const { _id, schoolName, schoolSlug, schoolImage } = allSchoolList;
              mySchoolMatch.push({
                _id,
                schoolName,
                schoolSlug,
                schoolImage,
                schoolApproved: subList.schoolApproved
              });
              setMatchSchool(mySchoolMatch);
            } else {
              const newnotmatch = SchoolNotMatch.filter((item) => item._id != subList.schoolId);
              SchoolNotMatch = newnotmatch
              setNotMatchSchool(newnotmatch);
            }
          });

          console.log('schoolMatch')
          console.log(mySchoolMatch)
          console.log('schoolNotMatch')
          console.log(SchoolNotMatch)

        } else {
          setNotMatchSchool(GlobalHook.getGlobalSchoolPool);
        }
      });
    }
  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalSchoolPool]);

  function RenderAddMyNewSchoolModal() {
    return (
      <Modal
        visible={getModalAddMyNewSchoolOpenStatus}
        title="Add My New School"
        onOk={() => setModalAddMyNewSchoolOpenStatus(false)}
        onCancel={() => {
          setModalAddMyNewSchoolOpenStatus(false);
        }}
        footer={[
          <div className="w-full flex justify-center">
            <button
              onClick={() => setModalAddMyNewSchoolOpenStatus(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={() => {
                setModalAddMyNewSchoolOpenStatus(false);
                AddMyNewSchoolAction(GlobalHook, getSelectedMySchool);
              }}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              Add
            </button>
          </div>
        ]}
      >
        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="flex mb-4">
            <label for="subject" className="font-semibold mr-4">
              Choose School :
            </label>
            <select
              id="subject"
              value={getSelectedMySchool}
              onChange={e => { setSelectedMySchool(e.target.value); console.log(e.target.value) }}
              style={{ minWidth: "100px" }}
            >
              {getNotMatchSchool.map(item => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.schoolName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      {RenderAddMyNewSchoolModal()}
      <div
        className="flex flex-col text-center mt-6 mx-auto items-center"
        style={{ minWidth: "200px" }}
      >
        <div className="font-bold text-lg mb-2 flex items-center">
          <div>My School</div>
          <div
            className="ml-2 bg-orange-500 hover:bg-orange-400 cursor-pointer p-2 rounded-full flex justify-center items-center text-white"
            style={{ width: "20px", height: "20px" }}
            onClick={() => {
              setModalAddMyNewSchoolOpenStatus(true);
              setSelectedMySchool(getNotMatchSchool[0]._id);
            }}
          >
            +
          </div>
        </div>

        <div className=" p-2" style={{ maxHeight: "300px", minWidth: "200px" }}>
          {console.log('tanaka')}
          {console.log(getMatchSchool)}
          {getMatchSchool.map((item, index) => {
            return (
              <div
                key={index}
                className="flex mt-4 bg-white  rounded-lg p-2 items-center cursor-pointer"
              >
                <div className="mr-4">
                  {" "}
                  <Avatar
                    size={40}
                    className="cursor-pointer"
                    src={item.schoolImage}
                  />
                </div>
                <div className="font-semibold">{item.schoolName}</div>
                {!item.schoolApproved && (
                  <Tooltip title="รอการตอบรับการสมัครเข้าโรงเรียน">
                    <GiSandsOfTime className="ml-4 text-orange-600 font-medium" />
                  </Tooltip>
                )}
                {item.schoolApproved && (

                  <Tooltip title="การตอบรับเป็นสมาชิกโรงเรียนสําเร็จ">
                    <FaUserCheck className="ml-4 text-green-600 font-medium" />
                  </Tooltip>
                )}
                {console.log('ittica')}
                {console.log(item)}
                
                <Tooltip title="ยกเลิกการสมัครเป็นสมชิกโรงเรียน">
                  <FaWindowClose onClick={() => RemoveMySchoolAction(GlobalHook,item._id)} className="ml-4 text-red-600 font-medium" />
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
