import React,{useState,useEffect,useContext} from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/banner/Banner"
import Header from '../components/header/HeaderTeacher'
import AdminCourse from '../components/adminCourse/AdminCourse'
import {getCoursePoolAction} from '../actions'
import {GlobalContext} from '../hook/GlobalHook'
import Footer from "../components/footer/Footer"

export default function Admin() {
    const GlobalHook = useContext(GlobalContext)
    useEffect(() => {
        getCoursePoolAction(GlobalHook) 
   }, [])
 
    return (
        <>
         <Helmet><title>Studysabai:Admin</title></Helmet>
        
        <Header/>
        <AdminCourse/>
        <Footer/>
       
       
        </>
    )
}
