import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { GlobalContext } from '../../hook/GlobalHook'

import { getUserFromFirebase,CreateTeacherPaymentAction,getSchoolPoolAction, UpdateFirebaseUser } from "../../actions";

const ProfileSetting = () => {
  const GlobalHook = useContext(GlobalContext)
  const [getEmail, setEmail] = useState("")
  const [getName, setName] = useState("")


  useEffect(() => {
    if (GlobalHook.getGlobalCurrentUser) {
      setName(GlobalHook.getGlobalCurrentUser.displayName)

      setEmail(GlobalHook.getGlobalCurrentUser.email)

    }
  }, [GlobalHook.getGlobalCurrentUser]);

  function handleNameChange() {
    console.log('HandleNameChange')
    console.log(GlobalHook.getGlobalCurrentUser)
    const displayName = GlobalHook.getGlobalCurrentUser.displayName;
    const uid = GlobalHook.getGlobalCurrentUser.uid;
    UpdateFirebaseUser(uid, getName)
  }

  return (
    <div className="w-100 mt-6 flex flex-col items-center">

      <div className="flex flex-col text-center mb-2 mb-6">
        <div className="font-bold text-lg mb-2">
          Name
          </div>
        <Input value={getName} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleNameChange} className="bg-blue-400 rounded p-2 mt-3"> Save Name Change </button>
      </div>

      <div className="flex flex-col text-center mb-2 mb-6">
        <div className="font-bold text-lg mb-2">
          Email
          </div>
        <Input disable={true} value={getEmail} onChange={(e) => setEmail(e.target.value)} />
      </div>


    </div>
  );
}

export default ProfileSetting;
