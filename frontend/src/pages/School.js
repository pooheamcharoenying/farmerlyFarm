import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import SchoolCourse from "../components/schoolCourse/SchoolCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction } from "../actions";
import { getSubjectCategories } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function School() {
  const GlobalHook = useContext(GlobalContext);

    useEffect(() => {
        getCoursePoolAction(GlobalHook);

    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:School</title>
      </Helmet>
      <Header />
     
      <SchoolCourse />
      <Footer />
    </>
  );
}
