import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../hook/GlobalHook";


export default function DropDownItem(props) {
  console.log('ddi')

  return (
    <div  
        className=" text-center p-2"  
        onclick=""
        style={{width: "200px", height:"40px", color:"pink", backgroundColor:"white", borderStyle:"solid", borderColor:"black", borderWidth:"1px"}}>
        {/* <ThemeContext.Consumer>     */}
        <p style={{ textAlign:"center"}}> {props.item} </p>
        {/* </ThemeContext.Consumer>   */}
    </div>
  );
}
