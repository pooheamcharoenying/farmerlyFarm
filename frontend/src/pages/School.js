import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import MySchoolCourse from "../components/schoolCourse/MySchoolCourse";
import AllSchoolCourse from "../components/schoolCourse/AllSchoolCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolIdBySlugAction, getSchoolPoolAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function School() {
  let { schoolSlug } = useParams();
  const GlobalHook = useContext(GlobalContext);
    useEffect(() => {
        getCoursePoolAction(GlobalHook);
        GlobalHook.setGlobalSchoolSlug(schoolSlug);
        getSchoolIdBySlugAction(GlobalHook,schoolSlug)
        getSchoolPoolAction(GlobalHook);
    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:School:{schoolSlug}</title>
      </Helmet>
      <Header />
     
      <MySchoolCourse />
      <AllSchoolCourse />
      <Footer />
    </>
  );
}
