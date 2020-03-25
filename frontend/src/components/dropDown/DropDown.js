import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../hook/GlobalHook";
// import DropDownItem from './DropDownItem'


const ThemeContext  = React.createContext()

export default function DropDown(props) {
  const GlobalHook = useContext(GlobalContext);
  const [getToggleDropDown, setToggleDropDown] = useState(false);
  var item = {
    menuEnglish: props.title,
    menuThai: props.title,
  };
  const [getChosenItem, setChosenItem] = useState(item);



  useEffect( () => {
    if (props.title == "Choose Subject") {
      GlobalHook.setGlobalCourseSubjectFilter(getChosenItem.menuEnglish)
    }
    if (props.title == "Choose Level") {
      GlobalHook.setGlobalCourseLevelFilter(getChosenItem.menuThai)
      console.log('level chosen')
      console.log(getChosenItem.menuThai)
    }
    // console.log('new item chosen')
    // console.log(GlobalHook.getGlobalCourseSubjectFilter)
  }, [getChosenItem]) 

 

  function openDropDown() {
    var tempVar = props.options;
    console.log('tempvar')
    console.log(tempVar)

    return (  
      <div style={{position:"absolute", color:"dark-gray", backgroundColor:"white", zIndex:"10"}}>
      {tempVar.map( (item) => {
        return (
          <div>
          <DropDownItem item={item}></DropDownItem>

          </div>
        )
      })}


      </div>
    )

  }
  console.log('ngolo')
  console.log(props.options)
  return (

  <div>
    <ThemeContext.Provider value={{ getChosenItem: getChosenItem, setChosenItem: setChosenItem, getToggleDropDown: getToggleDropDown, setToggleDropDown: setToggleDropDown}}>
        <button 
          className=" text-center p-2 mr-4" 
          style={{backgroundColor: props.color, width:"200px", borderStyle:"solid", borderColor:"black", borderWidth:"1px"}} 
          onClick={ () => setToggleDropDown(!getToggleDropDown) }> 
            {getChosenItem.menuThai} 
        </button>

        {/* <h1> hoho </h1> */}
        { (getToggleDropDown)? openDropDown() : <div></div>}
      </ThemeContext.Provider>
    </div>

  );
}

function DropDownItem(props) {
  const ConsumeThemeContext = useContext(ThemeContext)

  function handleItemClick() {
    console.log('item clicked')
    ConsumeThemeContext.setChosenItem(props.item)
    ConsumeThemeContext.setToggleDropDown(false)
  }

  return (
    <div  
        className=" text-center p-2"  
        onClick= {handleItemClick}
        style={{width: "200px", height:"40px", color:"dark-gray", backgroundColor:"white", borderStyle:"solid", borderColor:"black", borderWidth:"0.2px"}}>
          <p style={{ textAlign:"center"}}> {props.item.menuThai} </p>
    </div>
  );
}
