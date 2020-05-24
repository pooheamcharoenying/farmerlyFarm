import React, { useState, useEffect, useContext } from "react";
import { Modal, Table, Select, Avatar, message } from "antd";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import { FaPlusCircle, FaLeaf } from "react-icons/fa";
import { GiRollingEnergy, GiStomach } from "react-icons/gi"
import { AiOutlineSafety } from "react-icons/ai"

import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sideBar/SideBarCourse";
import CourseContent from "../components/courseContent/CourseContent";

import { getCourseContentAction, GetCourseSettingAction, FetchAllProducts, FetchAllFarms, UpdateShoppingCartAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function Course() {
  let { productSlug } = useParams();

  const GlobalHook = useContext(GlobalContext);

  const [getProduct, setProduct] = useState([])
  const [getFarmData, setFarmData] = useState([])

  useEffect(() => {
    FetchAllProducts()
      .then(data => {
        console.log('setting fetch data')
        console.log(data)
        console.log(productSlug)
        for (var product of data) {
          if (product.productSlug == productSlug) {
            console.log('match found: setting product')
            console.log(product)
            setProduct(product);
          }
        }
        FetchAllFarms()
          .then(farmData => {
            setFarmData(farmData)
          })
      })



    // getCourseContentAction(GlobalHook, courseSlug);
    // GetCourseSettingAction(GlobalHook, courseSlug);

    // GlobalHook.setGlobalCourseSlug(courseSlug);
  }, []);

  return (
    <div    >
      <Helmet>
        <title>Studysabai-Course</title>
      </Helmet>
      <Header />
      {/* <Banner /> */}


      <div style={{ backgroundColor: "#52BE80" }} className=" h-full w-full flex flex-col items-center py-4 justify-start">
        {/* <div className="w-10/12 rounded-lg text-center text-white py-2 text-2xl font-bold mb-8 md:mb-10 bg-orange-500">
          Dashboard
        </div> */}

        <div className="flex flex-row flex-wrap justify-center w-full">

          <div className="bg-gray-200 p-6 rounded-lg mb-6 mr-4 ml-4" style={{ height: "550px", minWidth: "500px", width: "200px", overflowY: "auto" }}>
            {/* <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{ width: "120px", maxHeight: "500px" }}>
              {console.log('getProduct')}
              {console.log(getProduct)}
              { getProduct.productName}
            </div> */}

            {/* <div style={{ minWidth: "240px", maxWidth: "240px", maxHeight: "280px", minHeight: "280px", backgroundColor: "white" }} className="bg-white flex flex-col shadow-lg rounded-lg relative "> */}
            <img className="w-full object-cover rounded-lg rounded-b-none" alt={getProduct.productName} style={{ minHeight: "350px", maxHeight: "350px", marginTop: "10px" }} src={getProduct.productImageURI || "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"} />


            <div style={{ width: "100%", textAlign: "center", fontSize: "0.8rem", marginTop: "20px" }}>
              <div className="flex items-center justify-center opacity-75 hover:opacity-50 mt-2 mb-1" >
                <GiStomach style={{ marginRight: "10px", fontSize: "1.2rem" }} />
                  Helps with digestion.
              </div>
              <div className="flex items-center justify-center opacity-75 hover:opacity-50 mt-2 mb-1" >
                <GiRollingEnergy style={{ marginRight: "10px", fontSize: "1.2rem" }} />
                  High energy density. Good for sports.
              </div>
              <div className="flex items-center justify-center opacity-75 hover:opacity-50 mt-2 mb-1" >
                <AiOutlineSafety style={{ marginRight: "10px", fontSize: "1.2rem" }} />
                  All our {getProduct.productName + "s "} are free from chemicals!
              </div>
              <div className="flex items-center justify-center opacity-75 hover:opacity-50 mt-2 mb-1" >
                <FaLeaf style={{ marginRight: "10px", fontSize: "1.2rem" }} />
                  All our bananas {getProduct.productName + "s "} are organically grown!
              </div>
            </div>

          </div>


          {/* <li> Helps with digestion. </li>
              <li> High energy density. Good for sports! </li>
              <li style={{color:"green"}}> All our {getProduct.productName + "s "} are free from chemicals! </li>
              <li style={{color:"green"}}> All our bananas {getProduct.productName + "s "} are organically grown! </li> */}

          <div className="bg-gray-200 p-6 rounded-lg mb-6 mr-4 ml-4 " style={{ height: "550px", minWidth: "500px", width: "200px", overflowY: "auto" }}>
            <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{ width: "120px", maxHeight: "500px" }}>
              {getProduct.productName}
            </div>

            <div className="bg-blue-200 p-6 rounded-lg mb-2 mt-2 " style={{ backgroundColor: "white", maxHeight: "260px", overflowY: "auto" }}>
              <p>{getProduct.productDescription}</p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg mb-2 " style={{ backgroundColor: "white", minHeight: "160px", overflowY: "auto" }}>
              <div>
                We get our {getProduct.productName} from these farms:
              </div>

              {console.log('getFarmData')}
              {console.log(getFarmData)}
              {/* <img className=" object-cover rounded-lg rounded-b-none" src={getFarmData.farmImageURI}  style={{ maxWidth:"60px",minHeight: "350px", maxHeight: "350px", marginTop: "10px" }}></img>               */}
              <div>

                {getFarmData.map((item) => {
                  return (
                    <div style={{ float: "left", marginLeft: "10px", marginTop: "10px" }}>
                      <Avatar
                        size={80}
                        className="cursor-pointer"
                        src={item.farmImageURI}
                      />
                      <div style={{ textAlign: "center", lineHeight: "1.5em", height: "6em", overflow: "hidden", width: "80px" }}>
                        <p >{item.farmName }</p>
                      </div>
                    </div>
                  )
                })}



              </div>




            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button 
                onClick={() => {
                 

                  // tempArray = GlobalHook.getGlobalCart;
                  // tempArray.push(getProduct.productName)
                  // GlobalHook.setGlobalCart(tempArray )
                  // GlobalHook.setGlobalCartEvent(true)
                  // console.log(tempArray)
                  
                  GlobalHook.setGlobalCartEvent(true)
                  var tempArray = [];
                  tempArray = GlobalHook.getGlobalCart;
                  var matchFound = tempArray.filter(element => element.productName == getProduct.productName)
                  console.log(matchFound)

                  if (matchFound.length > 0) {
                    matchFound[0].productQuantity = matchFound[0].productQuantity + 1; 
                  } else {
                    tempArray.push({
                      productName: getProduct.productName,
                      productQuantity: 1, 
                    })
                  }
                  console.log(tempArray)
                  if (GlobalHook.getGlobalUser) {
                    UpdateShoppingCartAction(GlobalHook.getGlobalUser.uid, tempArray)
                  }
                  localStorage.setItem( 'shoppingCart', JSON.stringify(tempArray) )


                }}
                className="rounded bg-blue-400 " 
                style={{ width: "100px", height: "60px" }}> 
                  Add to Cart
              </button>
            </div>



          </div>



        </div>


      </div>


      <Footer />

      {/* <SideBar />
      <CourseContent /> */}
    </div>
  );
}
