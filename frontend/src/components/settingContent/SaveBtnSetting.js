import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { GlobalContext } from '../../hook/GlobalHook'
const SaveBtnSetting = () => {
  const GlobalHook = useContext(GlobalContext)

  return (
    <div className="w-100 mt-6 flex flex-col items-center">

      <div className="flex flex-col text-center mb-2 mb-6">
        <button className="font-bold text-md mb-2 text-green-400 border-green-400 border-2 p-2">
          SAVE
          </button>
        
      </div>

     

    </div>
  );
}

export default SaveBtnSetting;
