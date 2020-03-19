import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Modal, Input, Select } from "antd";
import Header from "../components/header/HeaderHome";

import { getCoursePoolAction,CreateTeacherPaymentAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
import AvatarSetting from "../components/settingContent/AvatarSetting";
import ProfileSetting from "../components/settingContent/ProfileSetting";
import PasswordSetting from "../components/settingContent/PasswordSetting";
import SaveBtnSetting from "../components/settingContent/SaveBtnSetting";
import RadarChart from "../components/settingContent/chart/RadarChart";
const { Option } = Select;
export default function Dashboard() {
  const GlobalHook = useContext(GlobalContext);
  const [
    getSetupTeacherPaymentModalOpenStatus,
    setSetupTeacherPaymentModalOpenStatus
  ] = useState(false);
  useEffect(() => {
    getCoursePoolAction(GlobalHook);
  }, []);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
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
                CreateTeacherPaymentAction(GlobalHook)
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

          <Input className="mt-2" placeholder="Account Holder Name" />
          <Input className="mt-2" placeholder="Account Number" />
          <Select
            showSearch
            className="mt-2"
            style={{ width: 200 }}
            placeholder="Select Bank"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
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
              <div
                className="rounded-lg text-center text-black py-2  font-bold bg-yellow-400 hover:bg-yellow-300 mx-auto cursor-pointer"
                style={{ width: "250px", maxHeight: "500px" }}
                onClick={() => setSetupTeacherPaymentModalOpenStatus(true)}
              >
                Setup Teacher Payment
              </div>
            </div>
          </div>

          <div
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
              {/* <div style={{minHeight:"25px"}}/> */}
              {/* <RadialBarChart/> */}
            </div>
          </div>
        </div>
      </div>

      {/* <PasswordSetting/> */}

      {/* <SaveBtnSetting/> */}
    </>
  );
}
