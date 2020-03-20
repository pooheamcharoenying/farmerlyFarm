import React, { useContext, useEffect, useState } from "react";
import { Menu, Icon, message } from "antd";
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Dropdown, DropdownButton, Button } from "react-bootstrap"
import ScrollContainer from "react-indiana-drag-scroll";
import { FaCalculator, FaAtom, FaRobot, FaCode } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import CourseCard from "../courseCard/CourseCard";
import { GlobalContext } from "../../hook/GlobalHook";

import { getSubjectCategories, getSubjectLevels } from "../../actions";

import './AllCourse.css'


export default function AllCourse() {
  const GlobalHook = useContext(GlobalContext);
  const [getFiltedCourseData, setFiltedCourseData] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  const [getLevels, setLevels] = useState([]);

  const [getDropdownSubjects, setDropdownSubjects] = useState(false);
  const [getDropdownLevels, setDropdownLevels] = useState(false);


  let history = useHistory();
  var subjects = []

  useEffect(() => {
    console.log('getting subjects')

    getSubjectCategories()
      .then(data => {
        console.log('banobagen')
        console.log(data)
        setSubjects(data)
        setDropdownSubjects("Choose Subject")
      })
      .catch(error => {
        console.log(error)
      })

    getSubjectLevels()
      .then(data => {
        console.log('show levels')
        console.log(data[0])
        setLevels(data[0].LevelsThai)
        console.log('get levels')
        console.log(getLevels)
        setDropdownLevels("Choose Level")
      })
      .catch(error => {
        console.log(error)
      })



  }, []);

  useEffect(() => {
    GenCourseFilted();
  }, [
    GlobalHook.getGlobalCoursePool,
    GlobalHook.getGlobalCourseSubjectFilter,
    GlobalHook.getGlobalCourseLevelFilter
  ]);

  function GenCourseFilted() {
    console.log('filter search result')
    console.log(GlobalHook.getGlobalCourseSubjectFilter)
    console.log(GlobalHook.getGlobalCourseLevelFilter)
    let courseData = GlobalHook.getGlobalCoursePool;
    setFiltedCourseData(courseData);
    var NewFiltedSubjectPool;
    if (GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด") {
      NewFiltedSubjectPool = courseData;
    } else {
      let NewFiltedSubject = courseData.filter(
        data => data.courseSubject == GlobalHook.getGlobalCourseSubjectFilter
      );
      NewFiltedSubjectPool = NewFiltedSubject;
    }

    if (GlobalHook.getGlobalCourseLevelFilter == "ทั้งหมด") {
      setFiltedCourseData(NewFiltedSubjectPool);
    } else {
      let NewFiltedLevel = NewFiltedSubjectPool.filter(
        data => data.courseLevel == GlobalHook.getGlobalCourseLevelFilter
      );

      setFiltedCourseData(NewFiltedLevel);
    }
  }

  function handleCourseCatListClick(val) {
    GlobalHook.setGlobalCourseSubjectFilter(val.key);
  }

  function handleCourseLevelListClick(val) {
    GlobalHook.setGlobalCourseLevelFilter(val.key);
  }
  const CourseCatList = (
    <Menu onClick={handleCourseCatListClick}>
      <Menu.Item key="Mathematic">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaCalculator className="mr-2 text-black" />
          Mathematicffffffff
        </div>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="Physics">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaAtom className="mr-2 text-black" />
          Physics
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Robotics">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaRobot className="mr-2 text-black" />
          Robotics
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Coding">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaCode className="mr-2 text-black" />
          Coding
        </div>
      </Menu.Item>

      <Menu.Item key="Art">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaCode className="mr-2 text-black" />
          Art
        </div>
      </Menu.Item>

      <Menu.Item key="Music">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaCode className="mr-2 text-black" />
          Music
        </div>
      </Menu.Item>

      <Menu.Item key="Social Science">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          <FaCode className="mr-2 text-black" />
          Social Science
        </div>
      </Menu.Item>


    </Menu>
  );

  const CourseLevelList = (
    <Menu onClick={handleCourseLevelListClick}>
      <Menu.Item key="Mathematic">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          ประถม
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Physics">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          มัธยมต้น
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Robotics">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          มัธยมปลาย
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="Coding">
        <div className="flex w-30 justify-start items-center text-gray-700">
          {" "}
          มหาวิทยาลัย
        </div>
      </Menu.Item>
    </Menu>
  );

  function renderSubjectCat(subjectItem) {
    return (
      <div>
        <button
          className="rounded-lg  text-center p-2 mr-4"
          style={{
            flex: 1,
            background:
              GlobalHook.getGlobalCourseSubjectFilter == subjectItem.english
                ? "#3182ce"
                : "#e2e8f0"
          }}
          onClick={() => GlobalHook.setGlobalCourseSubjectFilter(subjectItem.english)}
        >
          {subjectItem.english}
        </button>
      </div>
    )
  }

  function renderLevels(levelItem) {
    return (
      <div>
          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == levelItem
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter(levelItem)}
          >
            {levelItem}
          </button>
      </div>
    )
  }

  function renderSubjectCatDropDown() {
    return (
      <div styles={{}}>

      <Button variant="flat" size="xxl">
          flat button
        </Button>

        <DropdownButton title={getDropdownSubjects} className="poohtest">
          <Dropdown.Item onClick={() => { setDropdownSubjects("ทั้งหมด"); GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด"); }}> ทั้งหมด </Dropdown.Item>
          {getSubjects.map(subjectItem => (
            <>
              <Dropdown.Item onClick={() => { setDropdownSubjects(subjectItem.english); GlobalHook.setGlobalCourseSubjectFilter(subjectItem.english); }}> {subjectItem.english} </Dropdown.Item>
            </>
          ))}

        </DropdownButton>
      </div>
    )
  }


  function renderLevelsDropDown() {
    return (
      <div   >
        <DropdownButton title={getDropdownLevels} variant="success" >
          <Dropdown.Item className="poohtest" onClick={() => { setDropdownLevels("ทั้งหมด"); GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด"); }}> ทั้งหมด </Dropdown.Item>
          {/* {getLevels.LevelsThai.map(levelItem => (
            <>
              <Dropdown.Item onClick={() => { setDropdownLevels(levelItem); GlobalHook.setGlobalCourseLevelFilter(levelItem); }}> {levelItem} </Dropdown.Item>
            </>
          ))} */}

        </DropdownButton>
      </div>
    )
  }


  return (
    <div className="bg-blue-300 w-full">

      <div
        className="flex  flex-col py-10 items-center  mx-auto "
        style={{ minHeight: "700px", maxWidth: "1500px" }}
      >

        <div className="bg-blue-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8">
          ค้นหาคอร์สใหม่
        </div>



        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            ทั้งหมด
          </button>

          {console.log('checking subject')}
          {console.log(getSubjects)}
          {getSubjects.map(subjectItem => (
            <div>
              {(subjectItem.superCat) ? renderSubjectCat(subjectItem) : ''}
            </div>
          ))}

        </div>





        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            ทั้งหมด
          </button>

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            Science
          </button>

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            Maths
          </button>

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            Physics
          </button>

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseSubjectFilter == "ทั้งหมด"
                  ? "#3182ce"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseSubjectFilter("ทั้งหมด")}
          >
            Coding
          </button>



        </div>











        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >
          {getLevels.map(levelItem => (
            <div>
              {renderLevels(levelItem)}
            </div>
          ))}

        </div>





        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >

          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == "ทั้งหมด"
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด")}
          >
            ทั้งหมด
          </button>


          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == "ประถม"
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter("ประถม")}
          >
            ประถม
          </button>
          
          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == "มัธยมต้น"
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter("มัธยมต้น")}
          >
            มัธยมต้น
          </button>
          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == "มัธยมปลาย"
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter("มัธยมปลาย")}
          >
            มัธยมปลาย
          </button>
          <button
            className="rounded-lg  text-center p-2 mr-4"
            style={{
              flex: 1,
              background:
                GlobalHook.getGlobalCourseLevelFilter == "มหาวิทยาลัย"
                  ? "#2f855a"
                  : "#e2e8f0"
            }}
            onClick={() => GlobalHook.setGlobalCourseLevelFilter("มหาวิทยาลัย")}
          >
            มหาวิทยาลัย
          </button>
        </div>























        <div
          className=" justify-around mb-6 px-10 flex flex-col md:hidden"
          style={{ width: "77%" }}
        >
          <div style={{ marginLeft: "15%" }}>
            {renderSubjectCatDropDown()}
          </div>

          <div style={{ marginLeft: "14%" }}>
            {renderLevelsDropDown()}
          </div>
        </div>

        {getFiltedCourseData[0] ? <ScrollContainer
          hideScrollbars={false}
          vertical={false}
          className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5"
        >
          {getFiltedCourseData.map((courseData, i) => (
            <div

              key={i}
              className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
              // onClick={() =>{ history.push(`/course/${courseData.courseSlug}`)}}
              onClick={() => window.location.href = `/course/${courseData.courseSlug}`}
            >
              <CourseCard courseData={courseData} />
            </div>
          ))}
        </ScrollContainer> : <div className="mt-20">ไม่พบคอร์สที่ตรงกัน</div>}
      </div>
    </div>
  );
}


