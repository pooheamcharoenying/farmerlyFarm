import React from 'react';
import{Input,Switch} from 'antd'

const StudioQuizContent  = () => {
    function onChange(){

    }
    return (
        <div className=" h-full w-full flex flex-col items-center">
        <div className="md:w-3/4 w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-10" style={{backgroundColor:"#41d6c3"}}>Quiz</div>
        <div className="flex  justify-center mb-6"><div className="text-right mr-4 font-bold flex justify-end items-center" >ชื่อบทเรียน</div><div style={{width:"200px"}}><Input placeholder="Basic usage" /></div></div>
        <div className="flex  justify-center mb-6"><div className="text-right mr-4 font-bold flex justify-end items-center" >ข้อกำหนดในการผ่าน</div><div style={{width:"200px"}}><Input placeholder="Basic usage" /></div></div>
        <div className="flex  justify-center mb-6"><div className="text-right mr-4 font-bold flex justify-end items-center" style={{width:"150px"}}>เฉลยทัน</div><div style={{width:"200px"}}><Switch defaultChecked onChange={onChange} /></div></div>

<div className="flex  justify-center mb-6">
<div className="flex  justify-center "><div className="text-right mr-4 font-bold flex justify-end items-center" >เฉลยทัน</div><div style={{width:"200px"}}><Switch defaultChecked onChange={onChange} /></div></div>

<div className="flex  justify-center "><div className="text-right mr-4 font-bold flex justify-end items-center">เฉลยทัน</div><div style={{width:"200px"}}><Switch defaultChecked onChange={onChange} /></div></div>


</div>
        </div>
    );
}

export default StudioQuizContent ;
