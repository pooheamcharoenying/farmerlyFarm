import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { GlobalContext } from '../../hook/GlobalHook'
const AvatarSetting = () => {
  const GlobalHook = useContext(GlobalContext)

  return (
    <div className="w-100 mt-6 flex flex-col items-center">

      <div className="flex flex-col text-center mb-2 mb-6">
        <div className="font-bold text-lg mb-2">
          Password
          </div>
        <Input.Password placeholder="......."/>
      </div>

     

    </div>
  );
}

export default AvatarSetting;
