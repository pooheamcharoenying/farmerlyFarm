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
        <div className="mt-6 flex flex-col items-center">
           {getAvatar&&<img src={getAvatar} alt="Avatar" class="rounded-full align-middle  mb-4" style={{width:"80px",height:"80px"}}></img>}
           {/* <button className="bg-gray-300 p-3 rounded-lg font-bold ">Change Profile Image</button> */}
        </div>
    );
}

export default AvatarSetting;
