import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../hook/GlobalHook";

export default function DropDown(props) {
  const GlobalHook = useContext(GlobalContext);

  function openDropDown() {
    var tempVar = props.options;
    console.log('tempvar')
    console.log(tempVar)
    tempVar.map(x => x * 2);
    tempVar.map( (item) => {
      Math.sqrt(item);
      Math.sqrt(item);
      Math.sqrt(item);
    })
    return (  
      <div>
        <h1 style={{color:"pink", position:"fixed", top:"100px"}}> ho ho </h1>
    {/* {tempVar.map( (item) => {
      Math.sqrt(item);
      Math.sqrt(item);
      Math.sqrt(item);
      return (<p> yofo </p>)
    })} */}


      </div>
    )

  }
  console.log('ngolo')
  console.log(props.options)
  return (
    <div>

        <button className="rounded-lg  text-center p-2 mr-4" style={{backgroundColor:"red"}} onClick={openDropDown}> {'boyo'} </button>
        <h1> hoho</h1>
        {openDropDown()}
    </div>
  );
}
