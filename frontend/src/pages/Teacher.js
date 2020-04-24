import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import Banner from "../components/banner/Banner";
import Header from "../components/header/HeaderTeacher";
import TeacherCourse from "../components/teacherCourse/TeacherCourse";
import { getCoursePoolAllAction } from "../actions";
import { GlobalContext } from "../hook/GlobalHook";
import Footer from "../components/footer/Footer";
import { ApiGatewayV2 } from "aws-sdk";

export default function Teacher() {
  const GlobalHook = useContext(GlobalContext);
  const fillerRef = useRef()
  const [getFillerHeight, setFillerHeight] = useState()
  useEffect(() => {
    getCoursePoolAllAction(GlobalHook);
  }, []);

  useEffect( () => {
    if(fillerRef.current) {
      console.log('setting filler')
      console.log(window.innerHeight)
      console.log(fillerRef.current.offsetTop)
      setFillerHeight(window.innerHeight - fillerRef.current.offsetTop)
    }
  }, [GlobalHook])


  return (
    <>
      <div>
        <Helmet>
          <title>Studysabai:Teacher</title>
        </Helmet>

        <Header />


        <div ref={fillerRef} className="bg-blue-300" style={{ minHeight:"100vh" }}>
          
        <TeacherCourse />
      </div>

        <Footer />
      </div>
    </>
  );
}
