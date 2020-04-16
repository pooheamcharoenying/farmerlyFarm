import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Banner from "../components/banner/Banner";
import Header from "../components/header/HeaderHome";
import TeacherCourse from "../components/teacherCourse/TeacherCourse";
import { getCoursePoolAllAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
import Footer from "../components/footer/Footer";

export default function Teacher() {
  const GlobalHook = useContext(GlobalContext);
  useEffect(() => {
    getCoursePoolAllAction(GlobalHook);
  }, []);
  return (
    <>
      <div>
        <Helmet>
          <title>Studysabai:Teacher</title>
        </Helmet>

        <Header />
        <TeacherCourse />
        <Footer />
      </div>
    </>
  );
}
