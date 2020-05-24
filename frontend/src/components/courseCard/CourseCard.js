import React, { useState, useContext, useEffect } from "react";
import { Icon } from 'antd';
import { FaPlusCircle } from "react-icons/fa";
export default function ProductCard({ courseData }) {
    const courseDataLocal = courseData || []

    const [getShowAddCart, setShowAddCart] = useState(false);

    return (
        <>
            <div onMouseOver={() => setShowAddCart(true)} onMouseLeave={() => setShowAddCart(false)} style={{ minWidth: "240px", maxWidth: "240px", maxHeight: "285px", minHeight: "285px", backgroundColor: "white" }} className="bg-white flex flex-col shadow-lg rounded-lg relative ">
                {/* <div className="bg-gray-500 absolute inset-0 opacity-0 hover:opacity-25 cursor-pointer"></div> */}


                <div onClick={() => {console.log('clickmate'); window.location.href = `/product/${courseDataLocal.productSlug}` }}>
                    <div className="bg-gray-500 absolute inset-0 opacity-0 cursor-pointer"></div>


                    <img className="w-full object-cover rounded-lg rounded-b-none" alt={courseDataLocal.courseName} style={{ minHeight: "180px", maxHeight: "180px" }} src={courseDataLocal.productImageURI || "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"} />
                    <div style={{ width: "100%", minHeight: "4px", backgroundColor: "#F8F9F9" }}>

                    </div>
                    <div className="text-xl mt-2 font-bold text-gray-900 px-2 capitalize text2line" style={{ marginTop: (getShowAddCart) ? '0px' : '20px', minHeight: "55px", maxHeight: "55px", textAlign: "center" }}>
                        <div>
                            {courseDataLocal.productName || ""}
                        </div>
                        <div>
                            {courseDataLocal.productPrice + "B" || ""}
                        </div>
                    </div>

                </div>






                <div
                    className="flex justify-between px-2 my-2 pt-3 "
                    style={{ display: (getShowAddCart) ? 'block' : 'none', minHeight: "40px", maxHeight: "40px", backgroundColor: "#0E6655", color: "white", borderBottomRightRadius: "0.5rem", borderBottomLeftRadius: "0.5rem" }}
                    onClick={() => {
                        console.log('add item click')

                    }}>

                    <div style={{ width: "100%", textAlign: "center" }}>
                        <div className="flex items-center justify-center opacity-75 hover:opacity-50" >
                            <FaPlusCircle style={{ paddingRight: "2px" }} /> {"  Add to Cart"}
                        </div>
                    </div>
                </div>

            </div>
        </>


    )
}
