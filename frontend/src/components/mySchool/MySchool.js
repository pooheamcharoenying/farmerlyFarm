import React,{useState,useContext,useEffect} from 'react'
import { GlobalContext } from "../../hook/GlobalHook";

export default function MySchool() {
  const GlobalHook = useContext(GlobalContext);
  const [getMatchSchool,setMatchSchool] = useState([])
  useEffect(() => {
    if(GlobalHook.getGlobalUser){
      console.log(GlobalHook.getGlobalUser.schoolCourse)

    }
    console.log(GlobalHook.getGlobalSchoolPool)
  }, [GlobalHook.getGlobalUser,GlobalHook.getGlobalSchoolPool])


  var mySchoolMatch = [];

  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalSchoolPool[0]) {
      GlobalHook.getGlobalUser.schoolCourse.map(subList =>
        GlobalHook.getGlobalSchoolPool.map(allSchoolList => {
          console.log(allSchoolList)
          console.log(subList)
          if (allSchoolList._id == subList.schoolId) {
            const {schoolName,schoolSlug,schoolImage} = allSchoolList
            mySchoolMatch.push({schoolName,schoolSlug,schoolImage,"schoolApproved":subList.schoolApproved});
        console.log(mySchoolMatch)
            setMatchSchool(mySchoolMatch);

           
          }
        })
      );
    }
  }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalSchoolPool]);

    return (
        <div className="flex flex-col text-center mt-6 mx-auto items-center" style={{ minWidth: "200px"}}>
        <div className="font-bold text-lg mb-2 flex items-center">
          <div>My School</div>
          <div className="ml-2 bg-orange-500 hover:bg-orange-400 cursor-pointer p-2 rounded-full flex justify-center items-center text-white" style={{width:"20px",height:"20px"}}>+</div>
          
          </div>
          <select
              id="subject"
              style={{ minWidth: "300px"}}>
            >
              {getMatchSchool.map(item => {
                return <option value={item.schoolName}>{item.schoolName}</option>;
              })}
            </select>
      </div>
    )
}
