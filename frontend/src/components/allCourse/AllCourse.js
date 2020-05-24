import React, { useContext, useEffect, useState, createRef } from "react";
import { Menu, Icon, message, Button } from "antd";

import ScrollContainer from "react-indiana-drag-scroll";
import { FaCalculator, FaAtom, FaRobot, FaCode } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import ProductCard from "../courseCard/CourseCard";
import { GlobalContext } from "../../hook/GlobalHook";

import {
  getSubjectCategories,
  getSubjectLevels,
  getSubjectMenu,
  FetchAllProducts,
  GetFirebaseUserByEmail,
} from "../../actions";

import "./AllCourse.css";
import Dropdown from "../dropDown/DropDown";

import ReactDOM from "react-dom";
import { GiMailShirt } from "react-icons/gi";

export default function AllProduct() {
  const GlobalHook = useContext(GlobalContext);

  let history = useHistory();

  const [getSubjectMenu, setSubjectMenu] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  const [getLevels, setLevels] = useState([]);


  const [getProducts, setProducts] = useState([]);

  useEffect(() => {
    // console.log('getting subjects')

    console.log('hellohi')
    FetchAllProducts()
      .then(data => {
        console.log('setting fetch data')
        console.log(data)
        setProducts(data)

        GetFirebaseUserByEmail("8moXINt8G8OdepCEYAmGNhuxjq52")
          .then(data => {
            console.log('getFirebaseUser')
            console.log(data)
          })
          .catch(error => {
            console.log(error);
          });


      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

  },[])

  useEffect(() => {
    GenCourseFiltedMainSubject(GlobalHook.getGlobalCourseMainSubjectFilter);
  }, [
    GlobalHook.getGlobalCoursePool,
    GlobalHook.getGlobalCourseMainSubjectFilter,
    GlobalHook.getGlobalCourseLevelFilter,
  ]);

  useEffect(() => {
    GenCourseFiltedSecondarySubject(GlobalHook.getGlobalCourseSubjectFilter);
  }, [
    GlobalHook.getGlobalCourseSubjectFilter,
  ]);



  function GenCourseFiltedMainSubject(subjectFilter) {
    const courseData = GlobalHook.getGlobalCoursePool.filter((data) => data.coursePublic)
    // let courseData = getcourseMatchPool;
    GlobalHook.setFilteredCourseData(courseData);

    console.log('gen1stBridge')

    var displayFilteredCats = []

    for (var subject of getSubjects) {
      // console.log(subject.category)
      if (subject.category.length > 0) {
        for (var subcat of subject.category) {
          if (subcat == subjectFilter) {
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
        // console.log('match found')
        for (var item of minifilter) {
          console.log('itemous')
          console.log(item)
          subjectFilterResult.push(item)
        }
      }
    }

    if (subjectFilter == "All Subjects") {
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
  }

  function GenCourseFiltedSecondarySubject(subjectFilter) {
    const courseData = GlobalHook.getGlobalCoursePool.filter((data) => data.coursePublic)
    // let courseData = getcourseMatchPool;
    GlobalHook.setFilteredCourseData(courseData);

    console.log('gen2ndBridge')

    var subjectFilterResult = []
    var minifilter = courseData.filter(data => data.courseSubject == subjectFilter);
    if (minifilter.length > 0) {
      console.log('match found')
      for (var item of minifilter) {
        console.log('itemous')
        console.log(item)
        subjectFilterResult.push(item)
      }
    }

    console.log('conclusion')
    console.log(subjectFilterResult)

    if (subjectFilter == "All Subjects") {
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
  }

  function handleCourseCatListClick(val) {
    GlobalHook.setGlobalCourseSubjectFilter(val.key);
  }

  function renderSubjectCat(subjectItem) {
    return (
      <div>
        <button
          className="rounded-lg  text-center p-2 mr-4"
          style={{
            height: "50px",
            width: "100px",
            flex: 1,
            background:
              GlobalHook.getGlobalCourseMainSubjectFilter == subjectItem.menuEnglish
                ? "#3182ce"
                : "#e2e8f0"
          }}
          onClick={() => GlobalHook.setGlobalCourseMainSubjectFilter(subjectItem.menuEnglish)}
        >
          {subjectItem.menuThai}
        </button>
      </div>
    );
  }

  function renderSecondarySubjectCat(subjectItem) {
    return (
      <div>
        <button
          // className="rounded-lg  text-center p-2 mr-4"
          className=" text-center p-2 mr-4 mb-4"
          style={{
            height: "40px",
            width: "100px",
            flex: 1,
            background:
              GlobalHook.getGlobalCourseSubjectFilter == subjectItem.english
                ? "#3182ce"
                : "#F7DC6F"
          }}
          onClick={() => GlobalHook.setGlobalCourseSubjectFilter(subjectItem.english)}
        >
          {subjectItem.thai}
        </button>
      </div>
    )
  }

  function processSecondarySubjectMenu() {
    var secondarySubjectMenu = []
    if (GlobalHook.getGlobalCourseMainSubjectFilter != "All Subjects") {
      for (var subject of getSubjects) {
        if (subject.category.length > 1) {
          for (var category of subject.category) {
            if (category == GlobalHook.getGlobalCourseMainSubjectFilter) {
              secondarySubjectMenu.push(subject)
            }
          }
        }
      }
      console.log('2ndMen')
      console.log(secondarySubjectMenu)

      if (secondarySubjectMenu.length > 0) {
        return (
          <>
            {secondarySubjectMenu.map(subjectItem => (
              <div>
                {renderSecondarySubjectCat(subjectItem)}
              </div>
            ))}
          </>
        )
      }
    }
  }

  function processSecondarySubjectMenuDropDown() {
    console.log('doggy')
    console.log(GlobalHook.getGlobalCourseMainSubjectFilter)

    var secondarySubjectMenu = []
    if (GlobalHook.getGlobalCourseMainSubjectFilter != "All Subjects") {
      for (var subject of getSubjects) {
        if (subject.category.length > 1) {
          for (var category of subject.category) {
            if (category == GlobalHook.getGlobalCourseMainSubjectFilter) {
              secondarySubjectMenu.push(subject)
            }
          }
        }
      }

      if (secondarySubjectMenu.length > 0) {
        return (
          <div className=" mt-1 ">
            <Dropdown options={secondarySubjectMenu} title={"Choose Secondary Subject"} getSubjects={getSubjects} color={"#F7DC6F"}></Dropdown>
          </div>
        )
      }
    }

  }

  function renderLevels(levelItem) {
    return (
      <div>
        <button
          // className="rounded-lg  text-center p-2 mr-4"
          className="rounded-lg  text-center p-2 mr-4"
          style={{
            width: "150px",
            flex: 1,
            background:
              GlobalHook.getGlobalCourseLevelFilter == levelItem.menuThai
                ? "#2f855a"
                : "#e2e8f0"
          }}
          onClick={() =>
            GlobalHook.setGlobalCourseLevelFilter(levelItem.menuThai)
          }
        >
          {levelItem.menuThai}
        </button>
      </div>
    );
  }

  function renderSubjectCatDropDown() {
    const tempVar = getSubjectMenu;

    return (
      <div styles={{}}>

        <Dropdown options={tempVar} title={"Choose Main Subject"} getSubjects={getSubjects} color={"#3182ce"}></Dropdown>
      </div>
    );
  }

  function renderLevelsDropDown() {
    const tempVar = getLevels;
    return (
      <div>
        <Dropdown options={tempVar} title={"Choose Level"} getSubjects={getSubjects} color={"#2f855a"}></Dropdown>
      </div>
    );
  }

  return (
    <div className="bg-green-300 w-full">
      <div
        className="flex  flex-col py-10 items-center  mx-auto "
        style={{ minHeight: "700px", maxWidth: "1500px" }}
      >
        {console.log('getProducts')}
        {console.log(getProducts)}
        <div className="bg-green-700 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-4">
          สั่งผักผลไม้ Farm to Table ได้แล้ววันนี้
        </div>

        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >

          {getSubjectMenu.map(subjectItem => (
            <div>
              {renderSubjectCat(subjectItem)}
            </div>
          ))}
        </div>

        <div
          // className=" justify-around mb-4 px-10 hidden md:flex"
          className="justify-center hidden md:flex"
          style={{ width: "77%" }}
        >
          {processSecondarySubjectMenu()}
        </div>



        <div
          className=" justify-around mb-4 px-10 hidden md:flex"
          style={{ width: "77%" }}
        >
          {getLevels.map((levelItem, index) => (
            <div key={index}>{renderLevels(levelItem)}</div>
          ))}
        </div>

        <div
          className=" justify-around mb-6 px-10 flex flex-col md:hidden"
          style={{ width: "77%" }}
        >
          <div style={{ marginLeft: "10%" }}>
            เลือกหมวดวิชา
            {renderSubjectCatDropDown()}
            {processSecondarySubjectMenuDropDown()}
          </div>

          {/* <div className="md:hidden">
            {console.log('tuktuk')}
            {processSecondarySubjectMenuDropDown()}
          </div> */}



          <div style={{ marginLeft: "10%", marginTop: "20px" }}>
            เลือกระดับชั้น
            {renderLevelsDropDown()}
          </div>
        </div>

        {console.log('showCourse')}
        {console.log(GlobalHook.getFilteredCourseData)}

        {getProducts ? <ScrollContainer
          hideScrollbars={false}
          vertical={false}
          className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5"
        >
          {getProducts.map((productData, i) => (
            <div

              key={i}
              className="  mb-12 mr-4 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center"
              // onClick={() =>{ history.push(`/course/${courseData.courseSlug}`)}}
              // onClick={() => window.location.href = `/product/${productData.productSlug}`}
            >
              <ProductCard courseData={productData} />
            </div>
          ))}
        </ScrollContainer> : <div className="mt-20">ไม่พบคอร์สที่ตรงกัน</div>}
      </div>

      {console.log('mainstay')}
      {console.log(GlobalHook.getGlobalCourseMainSubjectFilter)}
      {console.log('substay')}
      {console.log(GlobalHook.getGlobalCourseSubjectFilter)}
    </div>
  );
}
