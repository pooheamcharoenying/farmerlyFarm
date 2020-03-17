import React,{useContext,useEffect,useState} from 'react';
import {Menu, Dropdown,Avatar} from "antd";
import AvatarR from 'react-avatar';
import {
  
    FaCog,

    FaPowerOff,
    FaChalkboardTeacher
  } from "react-icons/fa";
import { useHistory } from 'react-router-dom';

  import {LogoutAction} from '../../actions'
import {GlobalContext} from '../../hook/GlobalHook'

const UserDropdown = () => {
  const GlobalHook = useContext(GlobalContext)
  const [getAvatar,setAvatar] = useState(null)
  const [getName,setName] = useState("")

  let history = useHistory();

  useEffect(() => {
    if(GlobalHook.getGlobalCurrentUser){
   setAvatar(GlobalHook.getGlobalCurrentUser.photoURL)
   setName(GlobalHook.getGlobalCurrentUser.displayName)

    }
  }, [GlobalHook.getGlobalCurrentUser]);


 
    
    const menu = (
        <Menu>
        <Menu.Item key="1">
          <div className="flex w-30 justify-start items-center text-gray-800 hover:text-black"onClick={()=>window.location.href="/teacher"}> <FaChalkboardTeacher className="mr-2 text-black"/>
          ครู</div>
          
        </Menu.Item>
        <Menu.Divider />
       
        <Menu.Item key="3">
    
          <div className="flex w-30 justify-start items-center text-gray-800" onClick={()=>history.push("/dashboard")}> <FaCog className="mr-2 text-black"/>
          Dashboard</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
    
          <div className="flex w-30 justify-start items-center text-gray-800" onClick={()=>LogoutAction(GlobalHook)} > <FaPowerOff className="mr-2 text-black"/>
          Logout</div>
        </Menu.Item>
      
      </Menu>
      );
    
    return (
      <Dropdown
      overlay={menu}
      placement="bottomLeft"
      className="flex"
    >
      {/* <Avatar size={40} className="cursor-pointer" src={"https://i.ya-webdesign.com/images/profile-avatar-png-9.png"}/> */}
      
    {(getAvatar) ?<Avatar size={40} className="cursor-pointer" src={getAvatar}/>: <Avatar size={40} className="cursor-pointer">{getName}</Avatar>}
      
    
    </Dropdown>
    );
}

export default UserDropdown;
