import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/HeaderHome";
import Banner from "../components/banner/Banner";
import MyCourse from "../components/myCourse/MyCourse";
import AllCourse from "../components/allCourse/AllCourse";
import Footer from "../components/footer/Footer";
import { getCoursePoolAction,getSubjectCategories } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
export default function Home() {
  const GlobalHook = useContext(GlobalContext);
  useEffect(() => {

    console.log('starting home ..................................................')
    getCoursePoolAction(GlobalHook);
    var subjectsData = "hobo"


<<<<<<< HEAD
    // getSubjectCategories()
    // .then(data => {
    //   console.log('banobagen')
    //   console.log(data)
    //   subjectsData = data;
    //   console.log(subjectsData)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
=======
    getSubjectCategories().then(data => {
     // console.log('banobagen')
      //console.log(data)
      subjectsData = data;
      //console.log(subjectsData)
    }).catch(err => console.log(err));
>>>>>>> master


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
