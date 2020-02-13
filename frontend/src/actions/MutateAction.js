import React from "react";
var _ = require('lodash');
function CheckMutateAction(GlobalHook,initState,changeState){
    console.log(initState)
    console.log(changeState)

        // const result = initState.localeCompare(changeState)
        // // console.log(result)

        // console.log(diff(initState,changeState))

        // function diff(obj1, obj2) {
        //     const result = {};
        //     if (Object.is(obj1, obj2)) {
        //         return undefined;
        //     }
        //     if (!obj2 || typeof obj2 !== 'object') {
        //         return obj2;
        //     }
        //     Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        //         if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        //             result[key] = obj2[key];
        //         }
        //         if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        //             const value = diff(obj1[key], obj2[key]);
        //             if (value !== undefined) {
        //                 result[key] = value;
        //             }
        //         }
        //     });
        //     return result;
        // }

//         var
// remoteJSON = {"allowExternalMembers": "false", "whoCanJoin": "CAN_REQUEST_TO_JOIN"},
//     localJSON = {"whoCanJoin": "CAN_REQUEST_TO_JOIN", "allowExternalMembers": "false"};
    
// console.log( _.isEqual(initState.slice(0, -1),changeState.slice(0, -1)) );
console.log(GlobalHook.getGlobalLessionSelect.new)
    if(initState == changeState){
        if (GlobalHook.getGlobalLessionSelect.new == "new") {
             
        GlobalHook.setMutantStatus(true)
        }else{
            GlobalHook.setMutantStatus(false)
        }
    }else{
       
        GlobalHook.setMutantStatus(true)

    }
}


export {CheckMutateAction}