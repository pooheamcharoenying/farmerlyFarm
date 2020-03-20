import React,{useContext} from "react";
import { Menu, Dropdown } from "antd";

import { FaTh, FaCalculator, FaAtom, FaRobot, FaCode } from "react-icons/fa";


import { GlobalContext } from "../../hook/GlobalHook";
import {courseSearchCatAction} from "../../actions"

const CourseCatDropdown = ({showTitle}) => {
  const GlobalHook = useContext(GlobalContext);

  function handleMenuClick(val) {
    courseSearchCatAction(GlobalHook,val.key)

  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Mathematic">
        <div className="flex w-30 justify-start items-center text-gray-600">
          {" "}
          <FaCalculator className="mr-2 text-gray-700" />
          Mathematic
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Physics">
        <div className="flex w-30 justify-start items-center text-gray-600">
          {" "}
          <FaAtom className="mr-2 text-gray-700" />
          Physics
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Robotics">
        <div className="flex w-30 justify-start items-center text-gray-600">
          {" "}
          <FaRobot className="mr-2 text-gray-700" />
          Robotics
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Coding">
        <div className="flex w-30 justify-start items-center text-gray-600">
          {" "}
          <FaCode className="mr-2 text-black" />
          Coding
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomLeft"
      className="focus:border-gray-300 "
    >
      <button className="flex justify-center items-center hover:bg-gray-200 text-xl text-gray-600 px-2" >
        <FaTh className="mr-2 text-gray-700" />
{showTitle&&"Courses"}
        
      </button>
    </Dropdown>
  );
};

export default CourseCatDropdown;