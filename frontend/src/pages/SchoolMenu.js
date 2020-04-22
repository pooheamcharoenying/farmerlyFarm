import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import MySchool from "../components/schoolCourse/MySchool";
import AllSchool from "../components/schoolCourse/AllSchool";
import AllCourse from "../components/allCourse/AllCourse";

import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolIdBySlugAction, getSchoolPoolAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";




export default function SchoolMenu() {
  const GlobalHook = useContext(GlobalContext);




  useEffect(() => {
        getCoursePoolAction(GlobalHook);
        getSchoolPoolAction(GlobalHook);
    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:SchoolAll</title>
      </Helmet>
      <Header />
     
      <MySchool />
      <AllSchool/>
      
      <Footer />
    </>
  );
}