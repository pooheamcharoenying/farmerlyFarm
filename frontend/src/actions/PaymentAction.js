import React from "react";
import axios from "axios";
import { message } from "antd";

async function CreateTeacherPaymentAction(GlobalHook,name,email,rpid){

    try {
        const res = await axios({
          method: "POST",
          url: "/api/payment/addTeacherPayment",
          data: {teacherPayment_AccountHolderName: GlobalHook.getGlobalTeacherPayment_AccountHolderName,
            teacherPayment_AccountNumber:GlobalHook.getGlobalTeacherPayment_AccountNumber,
            teacherPayment_AccountBank:GlobalHook.getGlobalTeacherPayment_AccountBank,name,email,rpid  },
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (res.data) {
         console.log(res.data)
      
        }
      } catch (err) {
        console.log(err);
      }
}

export {CreateTeacherPaymentAction}