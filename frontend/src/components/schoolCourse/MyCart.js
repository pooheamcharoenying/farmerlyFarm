import React, { useState, useContext, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Switch, Avatar, Table, Modal, Popover, Button, InputNumber } from 'antd'

import { GlobalContext } from '../../hook/GlobalHook'
import SchoolCard from "../courseCard/SchoolCard";

import CourseCard from '../courseCard/CourseCard'
import { UpdataCourseStatusAction, getSchoolPoolAction, FetchAllProducts, UpdateShoppingCartAction } from '../../actions'

import { useHistory } from "react-router-dom";
import { set } from 'mongoose';



export default function MyCart() {
  const { Column } = Table;
  let history = useHistory();

  const GlobalHook = useContext(GlobalContext)

  const [getSchoolMatchPool, setSchoolMatchPool] = useState([]);

  const [getProducts, setProducts] = useState([]);
  const [getCartTableData, setCartTableData] = useState([]);
  const [getEditCartItemModalState, setEditCartItemModalState] = useState(false);
  const [getToggleRefresh, setToggleRefresh] = useState(false)

  useEffect(() => {
    // console.log('getting subjects')

    console.log('hellohi')
    FetchAllProducts()
      .then(data => {
        console.log('setting fetch data')
        console.log(data)
        setProducts(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('bunalulu')
    if (GlobalHook.getGlobalCart.length > 0) {
      console.log("global cart")
      console.log(GlobalHook.getGlobalCart)

      var tempArray = [];
      for (var item of GlobalHook.getGlobalCart) {
        const matchFound = getProducts.filter(element => element.productName == item.productName)

        if (matchFound.length > 0) {
          console.log('maya')
          console.log(matchFound)

          tempArray.push({
            productPhoto: matchFound[0].productImageURI,
            productName: item.productName,
            productQuantity: item.productQuantity,
            productPrice: matchFound[0].productPrice,
            totalPrice: matchFound[0].productPrice * item.productQuantity,
          })
        }
      }
      console.log('tempArray')
      console.log(tempArray)
      setCartTableData(tempArray)
    }
  }, [GlobalHook.getGlobalCart, getProducts])

  useEffect( () => {
    console.log('jijijiji')
    setToggleRefresh(false)

  }, [getToggleRefresh])

  let LocalSchoolMatch = []
  // useEffect(() => {
  //   console.log('nookiejoo')
  //   console.log(GlobalHook.getGlobalUser)
  //   console.log(GlobalHook.getGlobalSchoolPool)
  //   if (GlobalHook.getGlobalUser && GlobalHook.getGlobalSchoolPool[0]) {
  //     GlobalHook.getGlobalSchoolPool.map(allSchoolList => {
  //       if (GlobalHook.getGlobalUser.schoolCourse[0]) {
  //         GlobalHook.getGlobalUser.schoolCourse.map(subList => {
  //           if ((allSchoolList._id == subList.schoolId) && subList.schoolApproved) {
  //      LocalSchoolMatch.push(allSchoolList);
  //      setSchoolMatchPool(LocalSchoolMatch)
  //           } 
  //         });
  //       } 
  //     });
  //   }
  // }, [GlobalHook.getGlobalUser, GlobalHook.getGlobalSchoolPool]);

  return (
    <div className="bg-blue-200 flex flex-col py-10 items-center" >

      {console.log('getCartTableData')}
      {console.log(getCartTableData)}

      <div className="bg-blue-400 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" > My Cart </div>


      <div className="bg-gray-200 p-6 rounded-lg mb-6" style={{ height: "600px", minWidth: "70%", width: "200px", overflowY: "auto" }}>

        {/* <div className="rounded-lg text-center text-white py-2 text-xl font-bold bg-purple-500 mx-auto" style={{ width: "120px", maxHeight: "500px" }}>
            Student
          </div> */}

        <div className="mt-4 flex flex-col">

          {/* <div
              onClick={() => { }}
              className="flex mt-4 bg-white  rounded-lg p-2 items-center"
              style={{ backgroundColor: "lightgray" , padding:"2vh" }} >
              <div className="mr-4"> </div>
              <Avatar
                        size={200}
                        className="cursor-pointer"
                        shape = "square"
                        src={"https://studysabaiapp.sgp1.digitaloceanspaces.com/farmerly-farm/farmerly-farm-farmimage.jpg"}
                      />

              <p> All Students</p>
            </div> */}


          <div className="" style={{ width: "auto" }}>
            <div className="mb-4 font-semibold text-xl">
              Remaining Quota: {GlobalHook.getGlobalSchoolInfo.schoolRemainingStudentQuota}
            </div>
            <Table
              dataSource={getCartTableData}
              onRowClick={e => {
              }}
            >
              <Column
                title="Picture"
                dataIndex="productPhoto"
                key="Profile"
                className="cursor-pointer"
                render={Profile => <Avatar shape="square" size={80} src={Profile} />}
              />

              <Column
                title="Item"
                dataIndex="productName"
                key="Name"
                className="cursor-pointer"
              />

              <Column
                title="Price"
                dataIndex="productPrice"
                key="Name"
                className="cursor-pointer"
              />

              <Column
                title="Quantity"
                dataIndex="productQuantity"
                key="Status"
                className="cursor-pointer"
                render={(text, record) => (
                    <InputNumber 
                      min={1} 
                      max={1000} 
                      defaultValue={record.productQuantity} 
                      onChange={(value)=> {
                        console.log('change attempt')
                        console.log(value)
                        var tempValue = 0;
                        if (isNaN(value)) {
                          var tempString = ""
                          for (var i = 0; i < value.length-1; i++) {
                            if (!isNaN(value[i])) {
                              tempString = tempString + value[i]
                            }
                          }
                          tempValue = tempString;
                        }
                        else {
                          tempValue = value;
                        }
                        console.log('tempValue')
                        console.log(tempValue)
                        var tempArray = getCartTableData;
                        const matchFound = tempArray.filter( element => element.productName == record.productName)
                        console.log(matchFound)
                        matchFound[0].productQuantity = tempValue;
                        setCartTableData(tempArray)
                        localStorage.setItem( 'shoppingCart', JSON.stringify(tempArray) )
                        console.log( 'get local storage')
                        console.log(tempArray)
                        console.log(localStorage.getItem( 'shoppingCart') )
                        console.log('get user')
                        console.log(GlobalHook.getGlobalUser)
                        console.log(tempArray)
                        if (GlobalHook.getGlobalUser) {
                          console.log('updatis')
                          UpdateShoppingCartAction(GlobalHook.getGlobalUser.uid, tempArray)
                        }

                        setToggleRefresh( true )
                      }} 
                    />
                )}
              />

              <Column
                title="Total Price"
                dataIndex="totalPrice"
                key="Status"
                className="cursor-pointer"
              />

              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>

                    <a className="text-red-500 hover:text-red-400"
                      onClick={() => {
                        var tempArray = getCartTableData;
                        const matchFoundIndex = tempArray.findIndex( element => element.name == record.name)
                        console.log(matchFoundIndex)
                        tempArray.splice(matchFoundIndex, 1)
                        setCartTableData(tempArray)
                        setToggleRefresh( true )
                      }}
                    >ยกเลิก</a>
                  </span>
                )}
              />
            </Table>
          </div>
        </div>
      </div>


      <Modal
        title="Basic Modal"
        visible={getEditCartItemModalState}
        onOk={() => setEditCartItemModalState(false)}
        onCancel={() => setEditCartItemModalState(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>


    </div>

  )
}
