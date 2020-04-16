import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Header from "../components/header/HeaderHome";
import SchoolInvite from "../components/schoolCourse/schoolInvite";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolIdBySlugAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function School() {
  let { schoolSlug } = useParams();
  const GlobalHook = useContext(GlobalContext);
    useEffect(() => {
        // getCoursePoolAction(GlobalHook);
         GlobalHook.setGlobalSchoolSlug(schoolSlug);
        // getSchoolIdBySlugAction(GlobalHook,schoolSlug)
    }, [])

  return (
    <>
      <Helmet>
        <title>Studysabai:SchoolInvite:{schoolSlug}</title>
      </Helmet>

      <Header />
     
      <SchoolInvite />
      <Footer />
    </>
  );
}
