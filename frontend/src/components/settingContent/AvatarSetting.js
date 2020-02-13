import React,{useState,useContext,useEffect} from 'react';
import { Avatar } from 'antd';
import {GlobalContext} from '../../hook/GlobalHook'
const AvatarSetting = () => {
    const GlobalHook = useContext(GlobalContext)
    const [getAvatar,setAvatar] = useState(null)
  
    useEffect(() => {
      if(GlobalHook.getGlobalCurrentUser){
     setAvatar(GlobalHook.getGlobalCurrentUser.photoURL)

  
      }
    }, [GlobalHook.getGlobalCurrentUser]);
    return (
        <div className="w-100  mt-6 flex flex-col items-center">
           {getAvatar&&<img src={getAvatar} alt="Avatar" class="rounded-full align-middle w-1/12 h-1/12 mb-4" ></img>}
           {/* <button className="bg-gray-300 p-3 rounded-lg font-bold ">Change Profile Image</button> */}
        </div>
    );
}

export default AvatarSetting;
