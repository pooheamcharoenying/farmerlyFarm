import React from 'react'

export default function Footer() {
    return (
        <div className="bg-gray-200 flex flex-row justify-between  items-center px-4 " style={{minHeight:"50px"}}>
         <div>Copyright © 2020 StudySabai</div>
         <div className="cursor-pointer text-gray-700 hover:text-gray-600 text-right">Terms {""}Privacy Policy</div>
        </div>
    )
}
