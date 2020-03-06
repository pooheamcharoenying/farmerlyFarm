import React,{useState,useContext,useEffect} from 'react'
import { Rate,Progress,Input } from 'antd';
import Rater from 'react-rater'
import { GlobalContext } from "../../hook/GlobalHook";
import {SetCourseReviewAction} from '../../actions'

const { TextArea } = Input;



export default function CourseReviewContent() {
  const GlobalHook = useContext(GlobalContext);

  const [getisSubscription,setisSubscription] = useState(false)
  const [getMyComment,setMyComment] = useState("")
  const [getMyRating,setMyRating] = useState(0)
  const [getReviewPool,setReviewPool] = useState([])

  const [getR5Count,setR5Count] = useState(0)
  const [getR4Count,setR4Count] = useState(0)
  const [getR3Count,setR3Count] = useState(0)
  const [getR2Count,setR2Count] = useState(0)
  const [getR1Count,setR1Count] = useState(0)
  const [getAverageRating,setAverageRating] = useState(0)


  useEffect(() => {

    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalCourseReviewPool) {
      setReviewPool(GlobalHook.getGlobalCourseReviewPool)
let myReview = GlobalHook.getGlobalCourseReviewPool.filter((item)=>item.user = GlobalHook.getGlobalUser._id)

if(myReview[0]){
  setMyRating(myReview[0].rating)
  setMyComment(myReview[0].comment)
}

let R5Count = 0
let R4Count = 0
let R3Count = 0
let R2Count = 0
let R1Count = 0
let RTotalCount = 0


GlobalHook.getGlobalCourseReviewPool.map((item)=>{
 if(item.rating == 5){
   R5Count++;
 }else if(item.rating == 4){
  R4Count++;
 }
 else if(item.rating == 3){
  R3Count++;
 }else if(item.rating == 2){
  R2Count++;
 }else if(item.rating == 1){
  R1Count++;
 }
 RTotalCount ++;
})


setR5Count(parseInt(R5Count*99.99/RTotalCount))
setR4Count(parseInt(R4Count*99.99/RTotalCount))
setR3Count(parseInt(R3Count*99.99/RTotalCount))
setR2Count(parseInt(R2Count*99.99/RTotalCount))
setR1Count(parseInt(R1Count*99.99/RTotalCount))

setAverageRating(((R5Count*5+R4Count*4+R3Count*3+R2Count*2+R1Count*1)/RTotalCount))



    }

  }, [GlobalHook.getGlobalCourseReviewPool])




  useEffect(() => {
    if (GlobalHook.getGlobalUser && GlobalHook.getGlobalcourseId) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setisSubscription(true);
        }
      });
    }else{
      setisSubscription(false);
    }
  }, );

  function handleSaveReviewClick(){
    SetCourseReviewAction(GlobalHook,{"comment":getMyComment,"rating":getMyRating,"user":GlobalHook.getGlobalUser._id})
  }

    return (
        <div className=" w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
          Rating & Review
        </div>
        <div className="flex flex-col text-center mb-6 md:mb-8 w-8/12">
        {getisSubscription &&
        <div  className="flex flex-col">
         <div className="text-left text-2xl font-semibold flex "><div className="mr-2">My Rating : </div><Rate  defaultValue={getMyRating} onChange={(e)=>setMyRating(e)}/></div>
        <div className="text-left text-2xl font-semibold flex mt-4"><div className="mr-2" style={{minWidth:"200px"}}>My Review : </div>
        <TextArea  placeholder="Typing Your Review Here"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={getMyComment} onChange={(e)=>{setMyComment(e.target.value)}}
          /> 
         <button
          className="text-white bg-green-500 p-2 border-2 rounded border-green-600 hover:text-green-600 hover:bg-white ml-2 text-center flex justify-center items-center"
          style={{width:"80px"}} onClick={()=>handleSaveReviewClick()}>
        SAVE</button>
        </div>
        </div>

          }
        <div className="text-left text-2xl font-semibold mt-6">Student Feedback</div>
        <div className="flex w-full ">
        <div className="flex flex-col" style={{width:"300px"}}>
            <div className="text-6xl font-bold">{getAverageRating}</div><Rater total={5} rating={getAverageRating} interactive={false}/><div className="font-medium">Course Rating</div></div>
        <div className="flex-1  flex flex-col">

          
            <div className="flex">
            <Progress percent={getR5Count} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={5} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={getR4Count} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={4} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={getR3Count} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={3} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={getR2Count} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={2} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={getR1Count} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={1} className="flex-1"/>
            </div>
    
        </div>
       
        </div>
        <div className="text-left text-2xl font-semibold mt-6">Reviews</div>
        <div className="flex flex-col items-center" style={{maxHeight:"800px",overflowY:"auto"}}>

          
        {getReviewPool.map((item,index)=>{

      return(
<div key={index} className="flex flex-col w-8/12 bg-white items-start p-2 mt-4 rounded-lg">
        <div className="flex"><div className="font-medium mr-2">{item.user}</div>  <Rate disabled defaultValue={item.rating} className="flex-1"/></div>
        <div className="text-left mt-2">{item.comment}</div>
        </div>
          )
          })}

       
        </div>
        </div>
    
      
      </div>
    )
}
