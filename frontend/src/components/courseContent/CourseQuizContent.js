import React,{useState,useEffect,useContext} from 'react'
import { GlobalContext, CourseQuizContext } from "../../hook/GlobalHook";

export default function CourseQuizContent() {
  const GlobalHook = useContext(GlobalContext);

  const [getCount,setCount] = useState(0)

  function handleKik(index){
    // let oldCount = getCount
    setCount(index)
  }

  useEffect(() => {

  console.log(getCount)
  }, )
  return (
    <div className="flex flex-col">
      Quiz
      {/* <button className="bg-green-300" onClick={()=>{setCount(getCount+1)}}>+1</button> */}
      {getCount}
      {[1,2,3].map((item)=>{
        return(
        <div className="bg-green-300 mt-4" style={{background:getCount == item ? "gray":"red"}} onClick={()=>{handleKik(item)}}>{item}</div>
        )
      })}
    </div>
  )
}
