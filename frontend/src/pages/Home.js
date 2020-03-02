import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import AllCourse from "../components/allCourse/AllCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function Home() {
  const GlobalHook = useContext(GlobalContext);
  useEffect(() => {
    getCoursePoolAction(GlobalHook);
  }, []);

  return (
    <>
      <Helmet>
        <title>Studysabai</title>
      </Helmet>
      <Header />
      <Banner />
      <MyCourse />
      <AllCourse />
      <Footer />
    </>
  );
}
