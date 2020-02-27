import React, { useState,useEffect } from "react";
import Cookies from 'js-cookie'
import {Spin } from 'antd';
import axios from 'axios';
import Firebase from "./firebase";

export const GlobalContext = React.createContext("GlobalContext");
export const FirebaseContext = React.createContext();
export const NewContext = React.createContext("NewContext");
export const CourseQuizContext = React.createContext("CourseQuizContext");



const Store = props => {

  const [ getGlobalCurrentUser,setGlobalCurrentUser] = useState(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(setGlobalCurrentUser);
  }, []);

  
  useEffect(() => {
  console.log(getGlobalCurrentUser)
  }, [getGlobalCurrentUser])

//User
const [getGlobalToken,setGlobalToken] = useState(null)
const [getGlobalUser,setGlobalUser] = useState(null)


//Common
const [getGlobalShowSideBarStatus,setGlobalShowSideBarStatus] = useState(false)
const [getGlobalLoading,setGlobalLoading] = useState(false)
const [getGlobalLoginTab,setGlobalLoginTab] = useState("Login")


//Modal
const [getGlobalShowSearch,setGlobalShowSearch] = useState(false)
const [getGlobalShowLoginModal,setGlobalShowLoginModal] = useState(false)
const [getGlobalShowMobileSearchBar,setGlobalShowMobileSearchBar] = useState(false)

//Course
 
const [getGlobalCoursePool,setGlobalCoursePool] = useState([])
const [getGlobalCourseContent,setGlobalCourseContent] = useState([])
const [getGlobalCourseSearch,setGlobalCourseSearch] = useState([])
const [getGlobalCourseSlug,setGlobalCourseSlug] = useState("")
const [getGlobalcourseId,setGlobalcourseId] = useState("")
const [getGlobalCourseTag,setGlobalCourseTag] = useState("")


const [getGlobalLessionSelect,setGlobalLessionSelect] = useState({})

const [getGlobalLessionSelectNew,setGlobalLessionSelectNew] = useState({})


const [getGlobalCourseStructure,setGlobalCourseStructure] = useState([])
const [getGlobalCourseStructureNew,setGlobalCourseStructureNew] = useState([])
const [getGlobalNotFirstLoadStatus,setGlobalNotFirstLoadStatus] = useState(false)

const [getGlobalStatusCode,setGlobalStatusCode] = useState("")
const [getGlobalStatusCodeQ,setGlobalStatusCodeQ] = useState("")

//Filter
const [getGlobalCourseSubjectFilter,setGlobalCourseSubjectFilter] = useState("ทั้งหมด")
const [getGlobalCourseLevelFilter,setGlobalCourseLevelFilter] = useState("ทั้งหมด")

//Studio
const [getGlobalCourseName,setGlobalCourseName] = useState("")
const [getGlobalCourseSubject,setGlobalCourseSubject] = useState("Mathematic")
const [getGlobalCourseLevel,setGlobalCourseLevel] = useState("ประถม")
const [getGlobalCourseTeacher,setGlobalCourseTeacher] = useState("")
const [getGlobalCourseDescription,setGlobalCourseDescription] = useState("")
const [getGlobalCourseImage,setGlobalCourseImage] = useState("")

const [getGlobalcourseImageFileName,setGlobalcourseImageFileName] = useState("")


//Quiz
const [getGloblaQuizQuestionSelect,setGloblaQuizQuestionSelect] = useState({})
const [getGloblaQuizQuestionName,setGloblaQuizQuestionName] = useState("")
const [getGloblaQuizQuestionField,setGloblaQuizQuestionField] = useState("")
const [getGloblaQuizAnswerType,setGloblaQuizAnswerType] = useState("MultipleChoice")
const [getGloblaQuizAnswerField,setGloblaQuizAnswerField] = useState([])
const [getGloblaQuizAnswerCorrect,setGloblaQuizAnswerCorrect] = useState()
const [getGloblaQuizExplainType,setGloblaQuizExplainType] = useState("Text")
const [getGloblaQuizExplainField,setGloblaQuizExplainField] = useState()
const [getGloblaQuizExplainFieldNew,setGloblaQuizExplainFieldNew] = useState()


const [getGloblaQuizAnswerFieldNew,setGloblaQuizAnswerFieldNew] = useState()

const [getGlobalUserAnswerPool,setGlobalUserAnswerPool] = useState({})
const [getGlobalUserAnswerSelect,setGlobalUserAnswerSelect] = useState("")

const [getGlobalQuizFinishStatus,setGlobalQuizFinishStatus] = useState(false)

//Media
const [getGlobalMediaVideo,setGlobalMediaVideo] = useState(null)
const [getGlobalMediaDocument,setGlobalMediaDocument] = useState("")
const [getGlobalMediaQuiz,setGlobalMediaQuiz] = useState()

//NewMedia
const [getGlobalMediaNew,setGlobalMediaNew] = useState()


const [getGlobalCourseInfoOverview,setGlobalCourseInfoOverview] = useState("")
const [getGlobalCourseInfoStudent,setGlobalCourseInfoStudent] = useState("")
const [getGlobalCourseInfoTeacher,setGlobalCourseInfoTeacher] = useState("")

const [getGlobalCourseInfoOverviewNew,setGlobalCourseInfoOverviewNew] = useState("")
const [getGlobalCourseInfoStudentNew,setGlobalCourseInfoStudentNew] = useState("")
const [getGlobalCourseInfoTeacherNew,setGlobalCourseInfoTeacherNew] = useState("")

const [getGlobalStudioUploadFile,setGlobalStudioUploadFile] = useState(null)


//Utility

const [getPrevNextStatus,setPrevNextStatus] = useState(null)

//MutateStatus

const [getMutantStatus,setMutantStatus] = useState(false)

//PopUp
const [getGlobalShowUnSaveAlertStatus,setGlobalShowUnSaveAlertStatus] = useState(false)

const [getStartedQuiz, setStartedQuiz] = useState(false);



    ///Generate GlobalHook///
    const GlobalHook = {

      getGlobalToken:getGlobalToken,
      setGlobalToken:setGlobalToken,

      getGlobalUser:getGlobalUser,
      setGlobalUser:setGlobalUser,

      getMutantStatus:getMutantStatus,
      setMutantStatus:setMutantStatus,


      getGlobalShowSideBarStatus:getGlobalShowSideBarStatus,
      setGlobalShowSideBarStatus:setGlobalShowSideBarStatus,

      getGlobalShowSearch:getGlobalShowSearch,
      setGlobalShowSearch:setGlobalShowSearch,

      getGlobalShowLoginModal:getGlobalShowLoginModal,
      setGlobalShowLoginModal:setGlobalShowLoginModal,

      getGlobalCoursePool:getGlobalCoursePool,
      setGlobalCoursePool:setGlobalCoursePool,

      getGlobalCourseSearch:getGlobalCourseSearch,
      setGlobalCourseSearch:setGlobalCourseSearch,

      getGlobalLoading:getGlobalLoading,
      setGlobalLoading:setGlobalLoading,

      getGlobalCourseContent:getGlobalCourseContent,
      setGlobalCourseContent:setGlobalCourseContent,

      getGlobalLessionSelect:getGlobalLessionSelect,
      setGlobalLessionSelect:setGlobalLessionSelect,
      
      getGlobalCourseName:getGlobalCourseName,
      setGlobalCourseName:setGlobalCourseName,

      getGlobalCourseSubject:getGlobalCourseSubject,
      setGlobalCourseSubject:setGlobalCourseSubject,

      getGlobalCourseLevel:getGlobalCourseLevel,
      setGlobalCourseLevel:setGlobalCourseLevel,
      
      getGlobalCourseTeacher:getGlobalCourseTeacher,
      setGlobalCourseTeacher:setGlobalCourseTeacher,

      getGlobalCourseDescription:getGlobalCourseDescription,
      setGlobalCourseDescription:setGlobalCourseDescription,
      
      getGlobalCourseImage:getGlobalCourseImage,
      setGlobalCourseImage:setGlobalCourseImage,

      getGlobalShowMobileSearchBar:getGlobalShowMobileSearchBar,
      setGlobalShowMobileSearchBar:setGlobalShowMobileSearchBar,

      getGlobalLoginTab:getGlobalLoginTab,
      setGlobalLoginTab:setGlobalLoginTab,

      getGlobalMediaVideo:getGlobalMediaVideo,
      setGlobalMediaVideo:setGlobalMediaVideo,

      getGlobalMediaDocument:getGlobalMediaDocument,
      setGlobalMediaDocument:setGlobalMediaDocument,

      getGlobalMediaQuiz:getGlobalMediaQuiz,
      setGlobalMediaQuiz:setGlobalMediaQuiz,

      getGlobalMediaNew:getGlobalMediaNew,
      setGlobalMediaNew:setGlobalMediaNew,


      getGlobalCourseInfoOverview:getGlobalCourseInfoOverview,
      setGlobalCourseInfoOverview:setGlobalCourseInfoOverview,

      getGlobalCourseInfoStudent:getGlobalCourseInfoStudent,
      setGlobalCourseInfoStudent:setGlobalCourseInfoStudent,

      getGlobalCourseInfoTeacher:getGlobalCourseInfoTeacher,
      setGlobalCourseInfoTeacher:setGlobalCourseInfoTeacher,

      getGlobalCourseInfoOverviewNew:getGlobalCourseInfoOverviewNew,
      setGlobalCourseInfoOverviewNew:setGlobalCourseInfoOverviewNew,

      getGlobalCourseInfoStudentNew:getGlobalCourseInfoStudentNew,
      setGlobalCourseInfoStudentNew:setGlobalCourseInfoStudentNew,

      getGlobalCourseInfoTeacherNew:getGlobalCourseInfoTeacherNew,
      setGlobalCourseInfoTeacherNew:setGlobalCourseInfoTeacherNew,

      getGlobalCourseStructure:getGlobalCourseStructure,
      setGlobalCourseStructure:setGlobalCourseStructure,

      getGlobalCourseStructureNew:getGlobalCourseStructureNew,
      setGlobalCourseStructureNew:setGlobalCourseStructureNew,

      getGloblaQuizQuestionSelect:getGloblaQuizQuestionSelect,
      setGloblaQuizQuestionSelect:setGloblaQuizQuestionSelect,

      getGloblaQuizQuestionName:getGloblaQuizQuestionName,
      setGloblaQuizQuestionName:setGloblaQuizQuestionName,

      getGloblaQuizQuestionField:getGloblaQuizQuestionField,
      setGloblaQuizQuestionField:setGloblaQuizQuestionField,

      getGloblaQuizAnswerType:getGloblaQuizAnswerType,
      setGloblaQuizAnswerType:setGloblaQuizAnswerType,

      getGloblaQuizAnswerField:getGloblaQuizAnswerField,
      setGloblaQuizAnswerField:setGloblaQuizAnswerField,

      getGloblaQuizAnswerCorrect:getGloblaQuizAnswerCorrect,
      setGloblaQuizAnswerCorrect:setGloblaQuizAnswerCorrect,

      getGloblaQuizExplainType:getGloblaQuizExplainType,
      setGloblaQuizExplainType:setGloblaQuizExplainType,

      getGloblaQuizExplainField:getGloblaQuizExplainField,
      setGloblaQuizExplainField:setGloblaQuizExplainField,

      getGloblaQuizExplainFieldNew:getGloblaQuizExplainFieldNew,
      setGloblaQuizExplainFieldNew:setGloblaQuizExplainFieldNew,

      getGloblaQuizAnswerFieldNew:getGloblaQuizAnswerFieldNew,
      setGloblaQuizAnswerFieldNew:setGloblaQuizAnswerFieldNew,

      getPrevNextStatus:getPrevNextStatus,
      setPrevNextStatus:setPrevNextStatus,

      getGlobalCourseSubjectFilter:getGlobalCourseSubjectFilter,
      setGlobalCourseSubjectFilter:setGlobalCourseSubjectFilter,

      getGlobalCourseLevelFilter:getGlobalCourseLevelFilter,
      setGlobalCourseLevelFilter:setGlobalCourseLevelFilter,

      getGlobalUserAnswerPool:getGlobalUserAnswerPool,
      setGlobalUserAnswerPool:setGlobalUserAnswerPool,

      getGlobalUserAnswerSelect:getGlobalUserAnswerSelect,
      setGlobalUserAnswerSelect:setGlobalUserAnswerSelect,

      getGlobalQuizFinishStatus:getGlobalQuizFinishStatus,
      setGlobalQuizFinishStatus:setGlobalQuizFinishStatus,

      getGlobalNotFirstLoadStatus:getGlobalNotFirstLoadStatus,
      setGlobalNotFirstLoadStatus:setGlobalNotFirstLoadStatus,

      getGlobalShowUnSaveAlertStatus:getGlobalShowUnSaveAlertStatus,
      setGlobalShowUnSaveAlertStatus:setGlobalShowUnSaveAlertStatus,

      getGlobalStudioUploadFile:getGlobalStudioUploadFile,
      setGlobalStudioUploadFile:setGlobalStudioUploadFile,

      getGlobalCurrentUser:getGlobalCurrentUser,
      setGlobalCurrentUser:setGlobalCurrentUser,

      getGlobalCourseSlug:getGlobalCourseSlug,
      setGlobalCourseSlug:setGlobalCourseSlug,

      getGlobalcourseId,
      setGlobalcourseId,
      
      getGlobalStatusCode,
      setGlobalStatusCode,

      getGlobalStatusCodeQ,
      setGlobalStatusCodeQ,

      getGlobalcourseImageFileName,
      setGlobalcourseImageFileName,

      getGlobalCourseTag,
      setGlobalCourseTag,

       
      getGlobalLessionSelectNew,
      setGlobalLessionSelectNew,

        






  
    };
    ////Data Wrap////
    useEffect( () => {

      (  async () =>{
        const  getToken = await Cookies.get('globalToken');
        setGlobalToken(getToken)

        axios.defaults.headers.common['Authorization'] = getToken;
    
        const  getUser =  localStorage.getItem("globalUser");
        
        setGlobalUser(JSON.parse(getUser));
    


        })()
      
      }, [])

      
    return (
      <GlobalContext.Provider value={GlobalHook}>
         <NewContext.Provider value={[getGlobalLessionSelectNew,setGlobalLessionSelectNew]}>
         <CourseQuizContext.Provider value={[getStartedQuiz, setStartedQuiz]}>

         <Spin tip="Loading..." spinning={getGlobalLoading}>
        {props.children}
        </Spin>
        </CourseQuizContext.Provider>
        </NewContext.Provider>
      </GlobalContext.Provider>
    );
  };
  
  export default Store;