import React from 'react'

export default function MySchool() {
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
              {["FIBO","MIT","KMUTT"].map(item => {
                return <option value={item}>{item}</option>;
              })}
            </select>
      </div>
    )
}
