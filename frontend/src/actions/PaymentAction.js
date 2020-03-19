import React from "react";
import axios from "axios";
import { message } from "antd";

async function CreateTeacherPaymentAction(name,email,GlobalHook){

    try {
        const res = await axios({
          method: "POST",
          url: "/api/payment/addTeacherPayment",
          data: {teacherPayment_AccountHolderName: GlobalHook.getGlobalTeacherPayment_AccountHolderName,
            teacherPayment_AccountNumber:GlobalHook.getGlobalTeacherPayment_AccountNumber,
            teacherPayment_AccountBank:GlobalHook.getGlobalTeacherPayment_AccountBank,name,email  },
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