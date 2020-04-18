import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import Header from "../components/header/HeaderStudio";
import SideBar from "../components/sideBar/SideBarStudio";
import StudioContent from "../components/studioContent/StudioContent";
import { getCourseContentAction, getCoursePoolAllAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";

export default function Studio() {
  let { courseSlug } = useParams();

  const GlobalHook = useContext(GlobalContext);

  useEffect(() => {
    // console.log("jurassic")
    getCourseContentAction(GlobalHook, courseSlug);
    GlobalHook.setGlobalCourseSlug(courseSlug);
    getCoursePoolAllAction(GlobalHook);
  }, []);

  window.onbeforeunload = function() {
    if (GlobalHook.getMutantStatus) {
      return "You have unsaved changes.  Do you want to leave this page and lose your changes?";
    } else {
      return;
    }
  };

  return (
    <div className="flex relative overflow-hidden bg-gray-100">
      {/* {console.log("studio")}
      {console.log(GlobalHook.getGlobalC)} */}
      <Helmet>
      <title>Studysabai:Studio::{GlobalHook.getGlobalCourseName}</title>
      </Helmet>
      <Header />
      <SideBar />
      <StudioContent />
    </div>
  );
}
