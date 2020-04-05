import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import SchoolCourse from "../components/schoolCourse/SchoolCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolIdBySlugAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function School() {
  let { schoolSlug } = useParams();
  const GlobalHook = useContext(GlobalContext);
    useEffect(() => {
        getCoursePoolAction(GlobalHook);
        GlobalHook.setGlobalSchoolSlug(schoolSlug);
        getSchoolIdBySlugAction(GlobalHook,schoolSlug)
    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:School:{schoolSlug}</title>
      </Helmet>
      <Header />
     
      <SchoolCourse />
      <Footer />
    </>
  );
}
