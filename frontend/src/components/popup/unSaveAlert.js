import React,{useContext} from 'react';
import {Modal} from 'antd'
import {GlobalContext} from '../../hook/GlobalHook'
const UnSaveAlert = () => {

    const GlobalHook = useContext(GlobalContext)

    function handleLeaveLogin(){
        if(true){
          GlobalHook.setGlobalShowUnSaveAlertStatus(false);
          GlobalHook.setMutantStatus(false);
          GlobalHook.setGlobalLessionSelect({"mediaType":"Overview"});
          GlobalHook.setGlobalShowSideBarStatus(false);
        }
    }
    return (
        <Modal
    visible={GlobalHook.getGlobalShowUnSaveAlertStatus}
    title="UnSaveAlert"
    onOk={() => GlobalHook.setGlobalShowUnSaveAlertStatus(false)}
    onCancel={() => {
        GlobalHook.setGlobalShowUnSaveAlertStatus(false);
    }}
    footer={[
      <div className="w-full flex justify-center">
         <button
          onClick={() =>{handleLeaveLogin()}}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
        >
          Leave
        </button>
      
        <button
          onClick={() => {GlobalHook.setGlobalShowUnSaveAlertStatus(false)}}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400"
        >
          cancel
        </button>


        
      </div>
    ]}
  >
    Changes that you made may not be saved.

  </Modal> 
    );
}

export default UnSaveAlert;
