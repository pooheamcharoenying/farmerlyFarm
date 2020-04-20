import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../hook/GlobalHook";
import { getSubjectLevels, getSubjectMenu } from "../../actions";
// import DropDownItem from './DropDownItem'


const ThemeContext = React.createContext()

export default function DropDown(props) {
  const GlobalHook = useContext(GlobalContext);
  const [getToggleDropDown, setToggleDropDown] = useState(false);

  var item;

  if (props.title == "Choose Main Subject") {
    item = {
      // menuEnglish: "เลือกหมวดวิชา",
      // menuThai: "เลือกหมวดวิชา",
      menuEnglish: GlobalHook.getGlobalCourseMainSubjectFilter,
      menuThai: GlobalHook.getGlobalCourseMainSubjectFilter,
    };
  }

  if (props.title == "Choose Level") {
    item = {
      menuEnglish: GlobalHook.getGlobalCourseLevelFilter,
      menuThai: GlobalHook.getGlobalCourseLevelFilter,
    };
  }

  if (props.title == "Choose Secondary Subject") {
    item = {
      english: GlobalHook.getGlobalCourseSubjectFilter,
      thai: GlobalHook.getGlobalCourseSubjectFilter,
    };
  }

  const [getChosenItem, setChosenItem] = useState(item);



  useEffect(() => {
    if (props.title == "Choose Main Subject") {
      console.log('mobileChooseMainSubject')
      console.log(getChosenItem)
      // if ( (item.menuEnglish != "เลือกหมวดวิชา") || (item.menuEnglish != "All Subjects") ){        
      //   GlobalHook.setGlobalCourseMainSubjectFilter(getChosenItem.menuEnglish)
      // } 
      // if ( (item.menuEnglish != "เลือกหมวดวิชา") || (item.menuEnglish != "All Subjects") ){        
        GlobalHook.setGlobalCourseMainSubjectFilter(getChosenItem.menuEnglish)
      // } 
    }

    if (props.title == "Choose Secondary Subject") {
      console.log('mobileChooseMainSubject')
      GlobalHook.setGlobalCourseSubjectFilter(getChosenItem.english)
    }

    if (props.title == "Choose Level") {
      GlobalHook.setGlobalCourseLevelFilter(getChosenItem.menuThai)
      // console.log('level chosen')
      // console.log(getChosenItem.menuThai)
    }
    // console.log('new item chosen')
    // console.log(GlobalHook.getGlobalCourseSubjectFilter)
  }, [getChosenItem])



  function openDropDown() {
    var tempVar = props.options;
    // console.log('tempvar')
    // console.log(tempVar)

    return (
      <div style={{ position: "absolute", color: "dark-gray", backgroundColor: "white", zIndex: "10" }}>
        {tempVar.map((item) => {
          return (
            <div>

              {(props.title == "Choose Main Subject") ? <DropDownMain item={item}></DropDownMain> : <></>}

              {(props.title == "Choose Level") ? <DropDownMain item={item}></DropDownMain> : <></>}

              {(props.title == "Choose Secondary Subject") ? <DropDownSecondary item={item}></DropDownSecondary> : <></>}

            </div>
          )
        })}
      </div>
    )
  }

  function handleMainDisplay() {
    console.log('kolo')
    console.log(GlobalHook.getGlobalCourseMainSubjectFilter)
    console.log(props.getSubjects)

    if (GlobalHook.getGlobalCourseMainSubjectFilter == "All Subjects")  {
      console.log('denilson')
      return( "ทั้งหมด")
    }
    else if  (GlobalHook.getGlobalCourseMainSubjectFilter != "เลือกหมวดวิชา")  {
      var filter1 = props.getSubjects.filter(item => item.english == GlobalHook.getGlobalCourseMainSubjectFilter)

      if (filter1.length == 1) {
        return( filter1[0].thai)
      }
    } 
    else {
        return( "เลือกหมวดวิชา")
    }
  }

  function handleSecondaryDisplay() {
    console.log('yolo')
    console.log(GlobalHook.getGlobalCourseSubjectFilter)
    console.log(props.options)

    // return (GlobalHook.getGlobalCourseSubjectFilter)
    

      var filter1 = props.options.filter(item => item.english == GlobalHook.getGlobalCourseSubjectFilter)
      if (filter1.length > 0) {
        var filter2 = props.options.filter(item => item.english == GlobalHook.getGlobalCourseSubjectFilter)
        return (filter2[0].thai)
      } else {
        return ("เลือกรายวิชา")
      }
    
  }


  return (

    <div>
      <ThemeContext.Provider value={{ getChosenItem: getChosenItem, setChosenItem: setChosenItem, getToggleDropDown: getToggleDropDown, setToggleDropDown: setToggleDropDown }}>
        <button
          className=" text-center p-2 mr-4"
          style={{ backgroundColor: props.color, width: "200px", borderStyle: "solid", borderColor: "black", borderWidth: "1px" }}
          onClick={() => setToggleDropDown(!getToggleDropDown)}>
          {/* {(props.title == "Choose Main Subject") ? getChosenItem.menuThai : ""} */}
          {(props.title == "Choose Main Subject") ? handleMainDisplay(): ""} 
          {(props.title == "Choose Level") ? getChosenItem.menuThai : ""}
          {(props.title == "Choose Secondary Subject") ? handleSecondaryDisplay() : ""}

        </button>

        {/* <h1> hoho </h1> */}
        {(getToggleDropDown) ? openDropDown() : <div></div>}
      </ThemeContext.Provider>
    </div>

  );
}





function DropDownMain(props) {
  const ConsumeThemeContext = useContext(ThemeContext)

  function handleItemClick() {
    console.log('item clicked')
    ConsumeThemeContext.setChosenItem(props.item)
    ConsumeThemeContext.setToggleDropDown(false)
  }

  return (
    <div
      className=" text-center p-2"
      onClick={handleItemClick}
      style={{ width: "200px", height: "40px", color: "dark-gray", backgroundColor: "white", borderStyle: "solid", borderColor: "black", borderWidth: "0.2px" }}>
      <p style={{ textAlign: "center" }}> {props.item.menuThai} </p>
    </div>
  );
}

function DropDownSecondary(props) {
  const ConsumeThemeContext = useContext(ThemeContext)

  function handleItemClick() {
    // console.log('item clicked')
    ConsumeThemeContext.setChosenItem(props.item)
    ConsumeThemeContext.setToggleDropDown(false)
  }

  return (
    <div
      className=" text-center p-2"
      onClick={handleItemClick}
      style={{ width: "200px", height: "40px", color: "dark-gray", backgroundColor: "white", borderStyle: "solid", borderColor: "black", borderWidth: "0.2px" }}>
      <p style={{ textAlign: "center" }}> {props.item.thai} </p>
    </div>
  );
}
