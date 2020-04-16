import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import SchoolAll from "../components/schoolCourse/SchoolAll";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolIdBySlugAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function School() {
  const GlobalHook = useContext(GlobalContext);
    useEffect(() => {
        getCoursePoolAction(GlobalHook);
    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:SchoolAll</title>
      </Helmet>
      <Header />
     
      <SchoolAll />
      <Footer />
    </>
  );
}