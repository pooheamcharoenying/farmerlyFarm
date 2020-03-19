import React from "react";
import axios from "axios";
import { message } from "antd";

async function CreateTeacherPaymentAction(GlobalHook){

    try {
        const res = await axios({
          method: "POST",
          url: "/api/payment/creditRecipient",
          data: {  },
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