import React, { useState, useEffect, useContext, useRef, createRef } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import AllCourse from "../components/allCourse/AllCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSchoolPoolAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function Home() {


  const allCourseRef = createRef()

  // function focusTestRef() {
  //   console.log('focusing') 
  //   allCourseRef.current.focus(); 
  //   }

  const GlobalHook = useContext(GlobalContext);
  useEffect(() => {
    

    // console.log('starting home ..................................................')
    getSchoolPoolAction(GlobalHook);
    console.log('starting home ..................................................')
    getCoursePoolAction(GlobalHook);

  }, []);

  return (
    <>
      <Helmet>
        <title>Studysabai</title>
      </Helmet>
      <Header allCourseRef={allCourseRef}/>
      <Banner />
      <MyCourse />
      <div ref={allCourseRef}>
        <AllCourse  />
      </div>

      {console.log('homeSweetHome')}
      {console.log(allCourseRef)}

      <Footer />
      {/* <div ref={allCourseRef}> 
        Hello bye
      </div> */}
    </>
  );
}
