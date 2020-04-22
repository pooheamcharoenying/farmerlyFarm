import React, { useState, useContext, useEffect } from "react";
import { Menu, Dropdown } from "antd";

import { FaTh, FaCalculator, FaAtom, FaRobot, FaCode } from "react-icons/fa";


import { GlobalContext } from "../../hook/GlobalHook";
import { courseSearchCatAction, getSubjectCategories, getSubjectLevels } from "../../actions"

// export default function CourseCatDropdown({ showTitle },props) {
export default function CourseCatDropdown( props) {
  const GlobalHook = useContext(GlobalContext);

  const [getSubjects, setSubjects] = useState([]);
  const [getLevels, setLevels] = useState([]);
  const [getSubjectMenu, setSubjectMenu] = useState([])



  useEffect(() => {

    console.log('proppifunk')
    console.log(props.allCourseRef)


    console.log('getting subjects')

    getSubjectCategories()
      .then(data => {
        console.log('banobagen')
        console.log(data)

        setSubjects(data)
        GlobalHook.setGlobalCourseSubjectFilter("All Subjects");
      })
      .catch(error => {
        console.log(error)
      })

    getSubjectLevels()
      .then(data => {
        console.log('show levels')
        console.log(data)
        for (var x of data) {
          if (x.type == "levelmenu") {
            console.log('level menu found')
            console.log(x)
            setLevels(x.menu)
          }
          if (x.type == "subjectmenu") {
            console.log('subject menu found')
            console.log(x)
            setSubjectMenu(x.menu)
          }
        }
        GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด");
      })
      .catch(error => {
        console.log(error)
      })

  }, []);

  useEffect(() => {
    console.log('genFilter')
    GenCourseFilted();
  }, [
    GlobalHook.getGlobalCoursePool,
    GlobalHook.getGlobalCourseSubjectFilter,
    GlobalHook.getGlobalCourseLevelFilter,
  ]);

  function GenCourseFilted() {
    const courseData = GlobalHook.getGlobalCoursePool.filter((data) => data.coursePublic)
    // GlobalHook.setFilteredCourseData(courseData);



    var displayFilteredCats = []

    for (var subject of getSubjects) {
      if (subject.category.length > 0) {
        for (var subcat of subject.category) {
          if (subcat == GlobalHook.getGlobalCourseSubjectFilter) {
            displayFilteredCats.push(subject)
          }
        }
      }
    }

    var subjectFilterResult = [];
    for (var filtercat of displayFilteredCats) {
      let minifilter = courseData.filter(
        data => data.courseSubject == filtercat.english
      );
      if (minifilter.length > 0) {
        console.log('match found')
        for (var item of minifilter) {
          subjectFilterResult.push(item)
        }
      }
    }



    if (GlobalHook.getGlobalCourseSubjectFilter == "All Subjects") {
      subjectFilterResult = courseData;
    }

    if (GlobalHook.getGlobalCourseLevelFilter == "ทั้งหมด") {
      GlobalHook.setFilteredCourseData(subjectFilterResult);
    } else {
      let NewFiltedLevel = subjectFilterResult.filter(
        data => data.courseLevel == GlobalHook.getGlobalCourseLevelFilter
      );
      GlobalHook.setFilteredCourseData(NewFiltedLevel);
    }

    console.log('gennyGemini')
    console.log(GlobalHook.getGlobalCourseSubjectFilter)
    console.log(subjectFilterResult)
    // console.log(NewFiltedLevel)
  }

  function handleMenuClick(val) {

    GlobalHook.setGlobalCourseLevelFilter("ทั้งหมด")

    var filter1 = getSubjects.filter( item => item.english == val.key)

    console.log('booya')
    console.log(val)
    console.log(filter1)

    if (filter1[0].category.length == 1) {
      console.log('MainMain')
      GlobalHook.setGlobalCourseMainSubjectFilter(val.key)
    } else if (filter1[0].category.length > 1) {
      console.log('MainSub')
      for (var category of filter1[0].category) {
        var filter2 = getSubjects.filter(item => item.english == category)
        if (filter2[0].category.length == 1) {
          console.log('MainSub-Cat')
          console.log(val.key)
          console.log(filter2)

          GlobalHook.setGlobalCourseMainSubjectFilter(filter2[0].english)
          GlobalHook.setGlobalCourseSubjectFilter(val.key)
        }
      }
    }
    console.log('jajamiao')
    // console.log(props.allCourseRef)

    window.scrollTo(0, props.allCourseRef.current.offsetTop-40);
    // courseSearchCatAction(GlobalHook,val.key)

  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {getSubjects.map((subjectItem) => (
        // <>
        <Menu.Item key={subjectItem.english}>
          <div className="flex w-30 justify-start items-center text-gray-600" >
            {" "}
            {/* <FaCalculator className="mr-2 text-gray-700" /> */}
            {subjectItem.thai}
          </div>
        </Menu.Item>
      ))}
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
        {props.showTitle && "Course"}
        {/* {"showTitle " && "Courses"} */}

      </button>
    </Dropdown>
  );
};

// export default CourseCatDropdown;