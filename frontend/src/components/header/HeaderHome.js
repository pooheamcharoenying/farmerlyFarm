import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "antd";
import { useHistory } from 'react-router-dom';

import { FaSearch, FaSchool, FaSave, FaShoppingCart } from "react-icons/fa";
import { GiFarmer, GiFarmTractor, GiFruitBowl } from "react-icons/gi"
import {RiCalendarEventLine} from "react-icons/ri"

import { GlobalContext } from "../../hook/GlobalHook";


import CourseCatDropdown from "./CourseCatDropdown";
import UserDropdown from "./UserDropdown";

import LoginMobileDropdown from "./LoginMobileDropdown";

import MobileSearchBar from "../popup/MobileSearchBar";

import { courseSearchKeywordAction, GetTokenAction } from "../../actions";
export default function HeaderHome(props) {
  const GlobalHook = useContext(GlobalContext);
  const { Search } = Input;
  const [getSearchValue, setSearchValue] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (getSearchValue !== "") {
      courseSearchKeywordAction(GlobalHook, getSearchValue);
    } else {
      GlobalHook.setGlobalShowSearch(false);
    }
  }, [getSearchValue]);

  useEffect(() => {
    if (!GlobalHook.getGlobalShowSearch) {
      setSearchValue("");
    }
  }, [GlobalHook.getGlobalShowSearch]);


  useEffect(() => {
    console.log('yahoo')
    GlobalHook.setGlobalCartEvent(false)
  }, [GlobalHook.getGlobalCartEvent]);

  useEffect( () => {
    const memUser = JSON.parse( localStorage.getItem("globalUser") )
    GetTokenAction(GlobalHook, memUser.uid)
    // GlobalHook.setGlobalUser( JSON.parse( localStorage.getItem("globalUser") ) );
    // GlobalHook.setGlobalToken( JSON.parse( localStorage.getItem("globalUser") ) );

    console.log('setToken')
    console.log(localStorage.getItem("globalToken"))
  }, [] );

  useEffect( () => {
    console.log('gotUser')
    console.log(GlobalHook.getGlobalUser)
    if (GlobalHook.getGlobalUser) {
      console.log('userLogEffect')
      console.log(GlobalHook.getGlobalUser)
      GlobalHook.setGlobalCart( GlobalHook.getGlobalUser.shoppingCart )
    } 
  }, [GlobalHook.getGlobalUser] );

  // useEffect( () => {
  //   if (GlobalHook.getGlobalUser) {
  //     console.log('userLogEffect')
  //     console.log(GlobalHook.getGlobalUser)
  //     GlobalHook.setGlobalCart( GlobalHook.getGlobalUser.shoppingCart )
  //   }
  //   // GlobalHook.setGlobalCart( JSON.parse(localStorage.getItem('shoppingCart')) )
  // }, [GlobalHook.getGlobalUser] );

  function shoppingCart() {
    var count = 0;
    console.log('jigidy')
    console.log(GlobalHook.getGlobalCart)
    for (var item of GlobalHook.getGlobalCart) {
      console.log('itoo')
      console.log(item.productQuantity)
      count = count + parseInt(item.productQuantity);
    }

    return(
      <button className="flex justify-center items-center hover:bg-gray-200 text-xl text-gray-600 mr-4 px-2" onClick={() => history.push("/school")}>
      <FaShoppingCart className="mr-2 text-gray-700" />
        {"Cart " + count}
      </button>
    )
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-50 flex flex-col">
        {console.log('headerHome')}
        {console.log(props.allCourseRef)}
        <div className="h-16 shadow-lg  flex flex-row justify-between items-center px-2 md:px-6 ">
          <div
            className="md:hidden text-2xl  justify-start flex"
            style={{ flex: 1 }}
          >
            <CourseCatDropdown showTitle={false} allCourseRef={props.allCourseRef} />
            {GlobalHook.getGlobalToken && (
              <button className="flex justify-center items-center hover:bg-gray-200 text-xl text-gray-600 mr-4 px-2" onClick={() => history.push("/school")}>
                <FaSchool className="mr-2 text-gray-700" />
              </button>
            )}
          </div>
          <a
            className=" text-green-600 flex text-3xl font-bold hover:text-blue-600 no-underline  md:flex-grow-0 flex-grow justify-center"
            href="/"
          >
            Farmerly Farm
          </a>

          <div
            className=" hidden md:flex justify-end ml-10 h-full"
            style={{ flex: 1 }}
          >


            <button className="flex justify-center items-center hover:bg-gray-200 text-xl text-gray-600 mr-4 px-2" onClick={() => history.push("/school")}>
              <RiCalendarEventLine className="mr-2 text-gray-700" />
                Events
              </button>

              <button className="flex justify-center items-center hover:bg-gray-200 text-xl text-gray-600 mr-4 px-2" onClick={() => history.push("/teacher")}>
              <GiFruitBowl className="mr-2 text-gray-700"/>
              {/* <FaSchool className="mr-2 text-gray-700" /> */}
                Farm Fresh
              </button>
              {console.log('getGlobalCart')}
              {console.log(GlobalHook.getGlobalCart)}
              {console.log(GlobalHook.getGlobalCart.length)}

              {shoppingCart()}



            {/* <CourseCatDropdown showTitle={true} allCourseRef={props.allCourseRef} /> */}

            {/* <Search
              placeholder="ค้นหา คอร์ส"
              onChange={value => setSearchValue(value.target.value)}
              value={getSearchValue}
              loading={getSearchValue != ""}
              className="ml-8 flex-grow-1 max-w-lg my-3"
            /> */}

            {console.log('getGlobalToken')}
            {console.log(GlobalHook.getGlobalToken)}
            {console.log(GlobalHook.getGlobalCurrentUser)}

            {GlobalHook.getGlobalToken ? (
              <div className="ml-6 flex items-center">
                <UserDropdown />
              </div>
            ) : (
                <div className="ml-6 flex items-center">
                  <Button
                    onClick={() => GlobalHook.setGlobalShowLoginModal(true)}
                  >
                    Login / Signup jojo
                </Button>
                </div>
              )}
          </div>

          <div
            className="md:hidden text-xl  justify-end flex items-center"
            style={{ flex: 1 }}
          >
            <div
              className="cursor-pointer hover:bg-gray-200 mr-4 text-gray-700"
              onClick={() =>
                GlobalHook.setGlobalShowMobileSearchBar(
                  !GlobalHook.getGlobalShowMobileSearchBar
                )
              }
            >
              <FaSearch />
            </div>

            {GlobalHook.getGlobalToken ? (
              <UserDropdown />
            ) : (
                <LoginMobileDropdown />
              )}
          </div>
        </div>
        <MobileSearchBar />
      </div>
    </>
  );
}
