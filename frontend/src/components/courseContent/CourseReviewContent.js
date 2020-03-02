import React from 'react'
import { Rate,Progress } from 'antd';
export default function CourseReviewContent() {
    return (
        <div className=" w-full flex flex-col items-center py-4 justify-start">
        <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
          Rating & Review
        </div>
        <div className="flex flex-col text-center mb-6 md:mb-8 w-8/12">
        <div className="text-left text-2xl font-semibold">Student feedback</div>
        <div className="flex w-full">
        <div className="  flex flex-col" style={{width:"300px"}}>
            <div className="text-6xl font-bold">4.3</div><Rate allowHalf defaultValue={4.3}/><div>Course Rating</div></div>
        <div className="flex-1  flex flex-col">
            <div className="flex">
            <Progress percent={46} strokeColor={"gray"}  className="flex-1"/>
            <Rate allowHalf defaultValue={5} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={40} strokeColor={"gray"}  className="flex-1"/>
            <Rate allowHalf defaultValue={4} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={12} strokeColor={"gray"}  className="flex-1"/>
            <Rate allowHalf defaultValue={3} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={8} strokeColor={"gray"}  className="flex-1"/>
            <Rate allowHalf defaultValue={2} className="flex-1"/>
            </div>
            <div className="flex">
            <Progress percent={4} strokeColor={"gray"}  className="flex-1"/>
            <Rate allowHalf defaultValue={1} className="flex-1"/>
            </div>
    
        </div>
        <div></div>
        </div>
          
        </div>
    
      
      </div>
    )
}
