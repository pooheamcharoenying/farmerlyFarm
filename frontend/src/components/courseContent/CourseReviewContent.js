import React,{useState,useContext,useEffect} from 'react'
import { Rate,Progress,Input } from 'antd';
import { GlobalContext } from "../../hook/GlobalHook";

const { TextArea } = Input;



export default function CourseReviewContent() {
  const GlobalHook = useContext(GlobalContext);

  const [getCourseSubscripted,setCourseSubscripted] = useState(false)


  useEffect(() => {
    if (GlobalHook.getGlobalUser) {
      GlobalHook.getGlobalUser.courseSubscription.map(data => {
        if (data.courseId == GlobalHook.getGlobalcourseId) {
          setCourseSubscripted(true)

         
        }
      });
    }
  }, );

    return (
        <div className=" w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
          Rating & Review
        </div>
        <div className="flex flex-col text-center mb-6 md:mb-8 w-8/12">
        {getCourseSubscripted &&
        <div  className="flex flex-col">
         <div className="text-left text-2xl font-semibold flex "><div className="mr-2">Your Rating : </div><Rate allowHalf defaultValue={3.5}/></div>
        <div className="text-left text-2xl font-semibold flex mt-4"><div className="mr-2" style={{minWidth:"200px"}}>Your Review : </div><TextArea  placeholder="Typing Your Review Here"
          autoSize={{ minRows: 2, maxRows: 6 }} /> 
         <button
          className="text-white bg-green-500 p-2 border-2 rounded border-green-600 hover:text-green-600 hover:bg-white ml-2 text-center flex justify-center items-center"
          style={{width:"80px"}}>
        SAVE</button>
        </div>
        </div>

          }
        <div className="text-left text-2xl font-semibold mt-6">Student Feedback</div>
        <div className="flex w-full ">
        <div className="flex flex-col" style={{width:"300px"}}>
            <div className="text-6xl font-bold">4.3</div><Rate allowHalf defaultValue={4.3}/><div>Course Rating</div></div>
        <div className="flex-1  flex flex-col">
            <div className="flex">
            <Progress percent={46} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={5} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={40} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={4} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={12} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={3} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={8} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={2} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={4} strokeColor={"gray"}  className="flex-1"/>
            <Rate disabled defaultValue={1} className="flex-1"/>
            </div>
    
        </div>
       
        </div>
        <div className="text-left text-2xl font-semibold mt-6">Reviews</div>
        <div className="flex flex-col items-center">

        <div id="comment-1" className="flex flex-col w-8/12 bg-white items-start p-2 mt-4 rounded-lg">
        <div className="flex"><div className="font-medium mr-2">Mustafa Tunc</div>  <Rate disabled defaultValue={1} className="flex-1"/></div>
        <div className="text-left mt-2">The course was much better than most and gives so good practical ideas.
Besides, it was repetition in so many lectures therefore, it comes some boring in some lectures. I think it could be shorter.</div>
        </div>

        <div id="comment-1" className="flex flex-col w-8/12 bg-white items-start p-2 mt-4">
        <div className="flex"><div className="font-medium mr-2">Mustafa Tunc</div>  <Rate disabled defaultValue={1} className="flex-1"/></div>
        <div className="text-left mt-2">The course was much better than most and gives so good practical ideas.
Besides, it was repetition in so many lectures therefore, it comes some boring in some lectures. I think it could be shorter.</div>
        </div>

        <div id="comment-1" className="flex flex-col w-8/12 bg-white items-start p-2 mt-4">
        <div className="flex"><div className="font-medium mr-2">Mustafa Tunc</div>  <Rate disabled defaultValue={1} className="flex-1"/></div>
        <div className="text-left mt-2">The course was much better than most and gives so good practical ideas.
Besides, it was repetition in so many lectures therefore, it comes some boring in some lectures. I think it could be shorter.</div>
        </div>

        </div>
        </div>
    
      
      </div>
    )
}
