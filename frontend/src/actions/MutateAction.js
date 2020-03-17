import React from "react";
var _ = require('lodash');
function CheckMutateAction(GlobalHook,initState,changeState){
   
    if(initState == changeState){
        if (GlobalHook.getGlobalLessionSelect.new == "new") {
            GlobalHook.setMutantStatus(true)
        }else{
            console.log("eureka!!!")
            GlobalHook.setMutantStatus(false)
        }
    }else{
       
        GlobalHook.setMutantStatus(true)

    }
}


export {CheckMutateAction}