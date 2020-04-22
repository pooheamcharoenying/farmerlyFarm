import React, { useState, useContext, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Switch, Modal, Input, Select, Tooltip, Button } from 'antd'
import { GlobalContext } from '../../hook/GlobalHook'

import { FaEdit } from "react-icons/fa"

import CourseCard from '../courseCard/CourseCard'
import SchoolCard from "../courseCard/SchoolCard";

import { UpdataCourseStatusAction, UpdateCourseTag, getSubjectCategories, getSchoolPoolAction } from '../../actions'
import axios from "axios";

import SchoolAdmin from "./AdminSchool";




export default function AdminCourse() {

    const GlobalHook = useContext(GlobalContext)

    const [getcourseMatchPool, setcourseMatchPool] = useState([])

    const [getSubjects, setSubjects] = useState([])
    const [getApprovedTags, setApprovedTags] = useState([])
    const [getUnapprovedTags, setUnapprovedTags] = useState([])
    const [getTagModalStatus, setTagModalStatus] = useState(false)


    // Tag Editing States
    const [getSelectedTag, setSelectedTag] = useState([])

    const [getSelectedTagId, setSelectedTagId] = useState("")
    const [getSelectedTagEnglish, setSelectedTagEnglish] = useState("")
    const [getTagDisableEnglish, setTagDisableEnglish] = useState(true)
    const [getSelectedTagThai, setSelectedTagThai] = useState("")
    const [getTagDisableThai, setTagDisableThai] = useState(true)
    const [getSelectedTagSubject, setSelectedTagSubject] = useState("")
    const [getTagDisableSubject, setTagDisableSubject] = useState(true)
    const [getSelectedTagApproval, setSelectedTagApproval] = useState(false)

    // Login to Admin Page States
    const [getUserEnteredPassword, setUserEnteredPassword] = useState("")
    const [getUserEnteredPasswordDisplay, setUserEnteredPasswordDisplay] = useState("")

    const [getLoginStatus, setLoginStatus] = useState(false)

    // School Management States
    const [getEditSchoolModal, setEditSchoolModal] = useState(false)
    const [getEditSchoolSelected, setEditSchoolSelected] = useState(false)
    const [getEditSchoolSelectedName, setEditSchoolSelectedName] = useState(false)

    useEffect(() => {
        axios
            .get(`/api/tag/getalltags/`)
            .then(res => {
                console.log('fetchy')
                console.log(res.data)

                setApprovedTags(res.data.filter(tag => tag.approval == true))
                setUnapprovedTags(res.data.filter(tag => tag.approval != true))

                getSubjectCategories()
                    .then(data => {
                        setSubjects(data)
                        GlobalHook.setGlobalCourseSubjectFilter("All Subjects");
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (GlobalHook.getGlobalCoursePool[0]) {

            const MatchPool = GlobalHook.getGlobalCoursePool.filter((data) => data.coursePublish)
            setcourseMatchPool(MatchPool)
        }
    }, [GlobalHook.getGlobalCoursePool])


    function handleTagClick(event) {
        console.log('tagClicked')
        console.log(event)
        setTagModalStatus(true)
        setSelectedTagId(event._id)
        setSelectedTagSubject(event.subject)
        setSelectedTagEnglish(event.english)
        setSelectedTagThai(event.thai)
        setSelectedTagApproval(event.approval)
    }

    function handleCloseModal() {
        setTagModalStatus(false)
    }


    function adminSucessfullySignedIn() {
        return (
            <div className="bg-blue-300 flex flex-col py-10 items-center" style={{ minHeight: "100vh" }}>


                <div className="bg-blue-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6" >คอร์สทั้งหมด</div>
                <ScrollContainer hideScrollbars={false} vertical={false} className="flex-row overflow-x-auto flex md:flex-wrap md:overflow-hidden mt-10 w-4/5" >
                    {getcourseMatchPool.map((courseData, i) => <div key={i} className=" mb-4 mr-2 md:mr-0 hover:text-black curser-pointer no-underline md:w-1/3  lg:w-1/4 xl:w-1/4 flex justify-center flex-col" >
                        <div className="bg-white flex justify-center rounded-lg py-4 -mb-2" style={{ width: "200px" }} ><div className="text-bold mr-2">Active</div> <Switch defaultChecked={courseData.courseActive} checkedChildren="Yes" unCheckedChildren="No" onClick={(courseStatus) => UpdataCourseStatusAction(GlobalHook, courseData.courseSlug, courseStatus)} /></div>
                        <div onClick={() => window.location.href = `/course/${courseData.courseSlug}`}>
                            <CourseCard courseData={courseData} />
                        </div>
                    </div>)}
                </ScrollContainer>



                <div className="bg-blue-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6 mt-6" style={{ backgroundColor: "#E67E22" }}> Tags Waiting For Approval </div>

                {console.log('yayo')}
                {console.log(getApprovedTags)}

                {getUnapprovedTags.map((tag) => (
                    <button
                        onClick={(e) => handleTagClick(tag)}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400 mt-2"
                        style={{ backgroundColor: "#F4D03F" }}
                    >
                        {tag.english}
                    </button>

                    // <p style={{backgroundColor:("yellow"), paddingLeft:"10px", paddingRight:"10px", paddingTop:"10px", paddingBottom:"10px" }} onClick={(e) => handleTagClick(tag)}> {tag.english} </p>
                ))}

                <div className="bg-blue-500 w-3/4 rounded-lg text-center text-white py-2 text-2xl font-bold mb-6 mt-6" style={{ backgroundColor: "#1D8348" }}> Approved Tags </div>
                {getApprovedTags.map((tag) => (
                    <button
                        onClick={(e) => handleTagClick(tag)}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-400 mt-2"
                        style={{ backgroundColor: "#2ECC71" }}
                    >
                        {tag.english}
                    </button>
                ))}

                {console.log('loggy')}

                <Modal
                    title="Edit Knowledge Tag"
                    visible={getTagModalStatus}
                    onOk={() => { setTagModalStatus(!getTagModalStatus); setSelectedTagEnglish(""); setTagDisableThai(true); setTagDisableEnglish(true); setTagDisableSubject(true) }}
                    onCancel={() => { setTagModalStatus(!getTagModalStatus); setSelectedTagEnglish(""); setTagDisableThai(true); setTagDisableEnglish(true); setTagDisableSubject(true) }}
                >
                    <form >
                        <label> {"Tag ID: " + getSelectedTagId} </label>

                        <label style={{ display: "inline-block" }}>
                            Tag English:
                        <input type="text" name="namnme" onChange={(event) => setSelectedTagEnglish(event.target.value)} value={getSelectedTagEnglish} disabled={getTagDisableEnglish} style={{ backgroundColor: (getTagDisableEnglish) ? "red" : "green" }} />
                            <label className="ml-2 bg-blue-500 rounded text-center mr-2 pr-2" onClick={() => { setTagDisableEnglish(!getTagDisableEnglish) }}> Edit </label>
                        </label>

                        <label style={{ display: "inline-block", marginTop: "5px" }}>
                            Tag Thai:
                        <input type="text" name="namnme" onChange={(event) => setSelectedTagThai(event.target.value)} value={getSelectedTagThai} disabled={getTagDisableThai} style={{ backgroundColor: (getTagDisableThai) ? "red" : "green" }} />
                            <label className="ml-2 bg-blue-500 rounded text-center mr-2 pr-2" onClick={() => { setTagDisableThai(!getTagDisableThai) }}> Edit </label>
                        </label>

                    </form>

                    <label for="subject" className="font-semibold mr-4">  {"Current Tag Subject : " + getSelectedTagSubject} </label>

                    {console.log("wtf")}
                    {console.log(getSelectedTagSubject)}

                    {(!getTagDisableSubject) ?
                        <select onClick={e => { console.log('clickclack'); console.log(e.target.value); setSelectedTagSubject(e.target.value) }}>
                            {/* <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option> */}
                            {getSubjects.map(item => {
                                return <option value={item.english}> {item.thai}</option>;
                            })}
                        </select> : <></>}

                    <label className="ml-2 bg-blue-500 rounded text-center mr-2 pr-2" onClick={() => { setTagDisableSubject(!getTagDisableSubject) }}> Edit </label>



                    <Switch
                        defaultChecked={getSelectedTagApproval}
                        checkedChildren="Approved"
                        unCheckedChildren="Not Approved"
                        onClick={e => setSelectedTagApproval(e)}
                    />

                    <button onClick={saveTagDataUpdate} className=" bg-green-500 rounded text-center mt-4 p-2 ml-2" > Save Changes </button>
                    {/* <button onClick={updateTagsInCourseDB} className=" bg-green-500 rounded text-center mt-4 p-2 ml-2" > Save Changes </button> */}

                    <button onClick={deleteTagUpdate} className=" bg-red-500 rounded text-center mt-4 p-2 ml-2" > Delete Tag </button>

                </Modal>

                {console.log("getAllCourse")}
                {console.log(GlobalHook.getGlobalCoursePool)}
            </div>
        )
    }

    function deleteTagUpdate() {
        console.log('deleting tag')
        const pushData = {
            id: getSelectedTagId,
        };

        // delete Tag from Tag DB  
        axios
            .post(`/api/tag/deletetagbyid/`, pushData)
            .then(res => {
                console.log('deleteTagSuccess')
                console.log(res.data)

                for (var course of GlobalHook.getGlobalCoursePool) {
                    // var filter1 = course.courseTagEnglish.filter( tag => tag.id == getSelectedTagId)

                    var tagMatchFound = false;
                    for (var tagIndex in course.courseTagEnglish) {
                        if (course.courseTagEnglish[tagIndex].id == getSelectedTagId) {
                            console.log('matchFound');
                            console.log(course.courseTagEnglish)
                            console.log(tagIndex)
                            tagMatchFound = true;
                            break;
                        }
                    }

                    if (tagMatchFound == true) {
                        console.log('matchProcess')
                        var temp = course.courseTagEnglish;
                        console.log(temp)
                        course.courseTagEnglish.splice(tagIndex, 1)
                        course.courseTagThai.splice(tagIndex, 1)
                        console.log(course.courseTagEnglish)

                        UpdateCourseTag(course._id, course.courseTagEnglish, course.courseTagThai)
                    }
                }

                // Re-Fetch Tag Data In Page
                axios
                    .get(`/api/tag/getalltags/`)
                    .then(res => {
                        console.log('fetchy')
                        console.log(res.data)

                        setApprovedTags(res.data.filter(tag => tag.approval == true))
                        setUnapprovedTags(res.data.filter(tag => tag.approval != true))

                        setTagDisableThai(true); setTagDisableEnglish(true); setTagDisableSubject(true);

                        setTagModalStatus(false)
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    }

    function updateTagsInCourseDB() {
        for (var course of GlobalHook.getGlobalCoursePool) {
            // var filter1 = course.courseTagEnglish.filter( tag => tag.id == getSelectedTagId)

            var tagMatchFound = false;
            for (var tagIndex in course.courseTagEnglish) {
                if (course.courseTagEnglish[tagIndex].id == getSelectedTagId) {
                    console.log('matchFound');
                    console.log(course.courseTagEnglish)
                    console.log(tagIndex)
                    tagMatchFound = true;
                    break;
                }
            }

            if (tagMatchFound == true) {
                console.log('matchProcess')
                course.courseTagEnglish[tagIndex].name = getSelectedTagSubject + ": " + getSelectedTagEnglish;
                course.courseTagEnglish[tagIndex].subject = getSelectedTagSubject;
                course.courseTagEnglish[tagIndex].approval = getSelectedTagApproval;


                var filterSubject = getSubjects.filter(subject => subject.english == getSelectedTagSubject)

                course.courseTagThai[tagIndex].name = filterSubject[0].thai + ": " + getSelectedTagThai;
                course.courseTagThai[tagIndex].subject = getSelectedTagSubject;
                course.courseTagThai[tagIndex].approval = getSelectedTagApproval;

                UpdateCourseTag(course._id, course.courseTagEnglish, course.courseTagThai)
            }
        }
    }


    function saveTagDataUpdate() {

        const pushData = {
            id: getSelectedTagId,
            english: getSelectedTagEnglish,
            thai: getSelectedTagThai,
            subject: getSelectedTagSubject,
            approval: getSelectedTagApproval
        };

        // update Tag Data DB
        axios
            .post(`/api/tag/updatetagbyid/`, pushData)
            .then(res => {
                console.log('updateTagSuccess')
                console.log(res.data)

                updateTagsInCourseDB();



                // Re-fetch Data
                axios
                    .get(`/api/tag/getalltags/`)
                    .then(res => {
                        console.log('fetchy')
                        console.log(res.data)

                        setApprovedTags(res.data.filter(tag => tag.approval == true))
                        setUnapprovedTags(res.data.filter(tag => tag.approval != true))
                        setTagDisableThai(true); setTagDisableEnglish(true); setTagDisableSubject(true);
                        setTagModalStatus(false)
                    })
                    .catch(err => console.log(err));

            })
            .catch(err => console.log(err));

    }



    function handlePasswordSubmit() {
        console.log('submit password')
        console.log(getUserEnteredPassword)
        if (getUserEnteredPassword == "WltbramPJL12") {
            setLoginStatus(true)
        }
    }

    function loginToAdmin() {
        return (
            <div style={{ height: "85vh" }}>
                <div style={{ height: "40vh" }}> </div>
                {/* <div className="justify-center hidden md:flex text-base" style={{width:"50%"}} > */}
                <div style={{ width: "40%", marginLeft: "30%", marginRight: "30%", display: "float" }}>
                    <Input.Password
                        // prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="password"
                        placeholder="Password"

                        // className="mb-6"
                        onChange={e => setUserEnteredPassword(e.target.value)}
                    />
                    <button className="bg-green-500 rounded text-center p-2" style={{ width: "100%", marginTop: "10px" }} onClick={handlePasswordSubmit} > Enter </button>
                </div>

                <div style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
                </div>

                <div style={{ height: "40vh" }}> </div>
            </div>
        )
    }

    return (
        <div>
            {/* {(getLoginStatus) ? adminSucessfullySignedIn() : loginToAdmin()} */}
            <SchoolAdmin></SchoolAdmin>
            {adminSucessfullySignedIn()}


        </div>

    )
}
