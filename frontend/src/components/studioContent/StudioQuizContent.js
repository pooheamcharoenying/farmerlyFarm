import React, { useState, useEffect, useContext } from "react";

import { FaTrashAlt, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Input, Switch, Select, Tabs, Popover } from "antd";
import SwitchR from "react-switch";


import { GlobalContext, NewContext } from "../../hook/GlobalHook";

const { Option } = Select;
const { TextArea } = Input;

const StudioQuizContent = () => {
  const GlobalHook = useContext(GlobalContext);
  const [getGlobalLessionSelectNew, setGlobalLessionSelectNew] = useContext(NewContext);

  const [getLessionTime, setLessionTime] = useState(null);
  const [getLessionName, setLessionName] = useState("");
  const [getQuizSettingShowAns, setQuizSettingShowAns] = useState(null);
  const [getQuizSettingTimeCount, setQuizSettingTimeCount] = useState(null);
  const [getQuizSettingRandom, setQuizSettingRandom] = useState(null);
  const [getQuizSettingAmountPass, setQuizSettingAmountPass] = useState(1);
  const [getQuizSettingAmountRandom, setQuizSettingAmountRandom] = useState(1);
  const [getShowConfirmDel, setShowConfirmDel] = useState(false);

  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

  function handleDeleteLession(){
  }

  return (
    <div className=" h-auto min-h-full w-full flex flex-col items-center py-4 justify-start">
      {/* //////////////////////HEAD////////// */}
      <div className="w-full flex mb-2  justify-center items-center">
        <FaCaretLeft
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("PrevLession")}
        />

        <div className="w-10/12 rounded-lg text-center text-white text-xl md:text-2xl font-bold  bg-blue-500 mx-2 py-2 px-2">
          {GlobalHook.getGlobalLessionSelect.mediaName}
        </div>
        <FaCaretRight
          className="hover:text-gray-700 text-gray-900 cursor-pointer"
          style={{ fontSize: "35px" }}
          onClick={() => GlobalHook.setPrevNextStatus("NextLession")}
        />
      </div>
      
 {/* ////////////////INFO////////////*/}
 <div className="flex flex-col text-center mb-4">
        <div className="flex items-baseline justify-center">
          <div className="font-bold text-lg mb-2">ชื่อบทเรียน</div>
          <Popover
            content={
              <div className="flex w-full justify-center">
                <div
                  className="text-red-600 hover:text-red-400 mr-4 cursor-pointer"
                  onClick={() => {
                    setShowConfirmDel(false);
                    handleDeleteLession();
                  }}
                >
                  Delete
                </div>{" "}
                <div
                  className="text-gray-600 hover:text-gray-500 cursor-pointer"
                  onClick={() => {
                    setShowConfirmDel(false);
                  }}
                >
                  cancel
                </div>
              </div>
            }
            title="Are you sure to delete this Lession?"
            trigger="click"
            visible={getShowConfirmDel}
            onVisibleChange={() => setShowConfirmDel(!getShowConfirmDel)}
          >
            <FaTrashAlt className="text-red-600 ml-4 text-xl cursor-pointer hover:text-red-500 " />
          </Popover>
        </div>

        <Input
          value={getLessionName}
          onChange={e => setLessionName(e.target.value)}
        />
      </div>

      <div className="flex justify-around w-10/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">ข้อกำหนดในการผ่าน</div>
          <Select
            style={{ maxWidth: "100px", width: "100px" }}
            className="self-center"
            defaultValue="1"
            onChange={e => setQuizSettingAmountPass(e)}
            value={getQuizSettingAmountPass}
          >
            {getQuizDataPool.map((temp, index) => (
              <Option value={index + 1}>{index + 1}</Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">เฉลยทันที</div>

          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingShowAns(e)}
            checked={getQuizSettingShowAns}
          />
        </div>
      </div>

      <div className="flex justify-around w-11/12 md:w-4/12 mb-4">
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จับเวลาหรือไม่</div>

          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingTimeCount(e)}
            checked={getQuizSettingTimeCount}
          />
        </div>
        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">ระยะเวลาที่กำหนด</div>
          <Input
            className="self-center"
            value={getLessionTime}
            onChange={e => setLessionTime(e.target.value)}
            suffix="นาที"
            style={{ maxWidth: "100px" }}
            disabled={!getQuizSettingTimeCount}
          />
        </div>
      </div>

      <div className="flex justify-around w-11/12 md:w-4/12 mb-8">
        <div className="flex flex-col text-center ">
          <div className="font-bold text-lg mb-2">สุ่มคำถามหรือไม่</div>

          <SwitchR
            className="self-center"
            onChange={e => setQuizSettingRandom(e)}
            checked={getQuizSettingRandom}
          />
        </div>

        <div className="flex flex-col text-center">
          <div className="font-bold text-lg mb-2">จำนวนข้อที่เลือกสุม</div>
          <Select
            style={{ maxWidth: "100px", width: "100px" }}
            className="self-center"
            defaultValue="1"
            onChange={e => setQuizSettingAmountRandom(e)}
            value={getQuizSettingAmountRandom}
            disabled={!getQuizSettingRandom}
          >
            {getQuizDataPool.map((temp, index) => (
              <Option value={index + 1}>{index + 1}</Option>
            ))}
          </Select>
        </div>
      </div>

    </div>
  );
}

export default StudioQuizContent;
